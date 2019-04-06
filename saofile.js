const { join } = require('path')
const glob = require('glob')
const spawn = require('cross-spawn')
const validate = require('validate-npm-package-name')

const rootDir = __dirname

module.exports = {
  prompts: [
    {
      name: 'name',
      message: 'Project name',
      default: '{outFolder}'
    },
    {
      name: 'description',
      message: 'Project description',
      default: 'My Nuxt.js project'
    },
    {
      name: 'features',
      message: 'Choose features to install',
      type: 'checkbox',
      choices: [
        {
          name: 'Progressive Web App (PWA) Support',
          value: 'pwa'
        },
        {
          name: 'Linter / Formatter',
          value: 'linter'
        },
        {
          name: 'Prettier',
          value: 'prettier'
        },
        {
          name: 'Axios',
          value: 'axios'
        },
        {
          name: 'TypeScript Support',
          value: 'typescript'
        }
      ],
      default: []
    },
    {
      name: 'mode',
      message: 'Choose rendering mode',
      type: 'list',
      choices: [
        { name: 'Universal', value: 'universal' },
        { name: 'Single Page App', value: 'spa' }
      ],
      default: 'universal'
    },
    {
      name: 'author',
      type: 'string',
      message: 'Author name',
      default: '{gitUser.name}',
      store: true
    },
    {
      name: 'pm',
      message: 'Choose a package manager',
      choices: ['npm', 'yarn'],
      type: 'list',
      default: 'npm'
    }
  ],

  templateData () {
    const edge = process.argv.includes('--edge')
    const pwa = this.answers.features.includes('pwa')
    const linter = this.answers.features.includes('linter')
    const prettier = this.answers.features.includes('prettier')
    const axios = this.answers.features.includes('axios')
    const typescript = this.answers.features.includes('typescript')

    return {
      edge,
      pwa: pwa ? 'yes' : 'no',
      eslint: linter ? 'yes' : 'no',
      prettier: prettier ? 'yes' : 'no',
      axios: axios ? 'yes' : 'no',
      typescript: typescript ? 'yes' : 'no'
    }
  },

  actions () {
    const validation = validate(this.answers.name)
    validation.warnings && validation.warnings.forEach((warn) => {
      console.warn('Warning:', warn)
    })
    validation.errors && validation.errors.forEach((err) => {
      console.error('Error:', err)
    })
    validation.errors && validation.errors.length && process.exit(1)

    const actions = [{
      type: 'add',
      files: '**',
      templateDir: 'template/nuxt',
      filters: {
        'static/icon.png': 'features.includes("pwa")'
      }
    }]

    if (this.answers.features.includes('typescript')) {
      actions.push({
        type: 'add',
        files: '**',
        templateDir: 'template/frameworks/typescript'
      })
    }

    actions.push({
      type: 'add',
      files: '*',
      filters: {
        '_.eslintrc.js': 'features.includes("linter")',
        '_.prettierrc': 'features.includes("prettier")'
      }
    })

    actions.push({
      type: 'move',
      patterns: {
        '_.gitignore': '.gitignore',
        '_package.json': 'package.json',
        '_.eslintrc.js': '.eslintrc.js',
        '_.prettierrc': '.prettierrc'
      }
    })

    return actions
  },

  async completed () {
    this.gitInit()

    await this.npmInstall({ npmClient: this.answers.pm })

    const isNewFolder = this.outDir !== process.cwd()
    const cd = () => {
      if (isNewFolder) {
        console.log(`\t${this.chalk.cyan('cd')} ${this.outFolder}`)
      }
    }

    if (this.answers.features.includes('linter')) {
      const options = ['run', 'lint', '--', '--fix']
      if (this.answers.pm === 'yarn') {
        options.splice(2, 1)
      }
      spawn.sync(this.answers.pm, options, {
        cwd: this.outDir,
        stdio: 'inherit'
      })
    }

    console.log()
    console.log(this.chalk.bold(`  To get started:\n`))
    cd()
    console.log(`\t${this.answers.pm} run dev\n`)
    console.log(this.chalk.bold(`  To build & start for production:\n`))
    cd()
    console.log(`\t${this.answers.pm} run build`)
    console.log(`\t${this.answers.pm} start`)

    console.log()
  }
}
