#!/usr/bin/env node


const chalk = require('chalk');
const program = require('commander');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const mkdirp = require('mkdirp');



//configurations

const vueFileTpl = 'template/component.vue.tmpl'
const tsFileTpl = 'template/component.ts.tmpl'



program
  .name('vt generate|g')
  .arguments('<componentName>')
  .option('-x, --tsx', 'Create tsx file instead of ts')
  .option('-s, --src [srcDir]', 'Your src dir, default is src', 'src')
  .option('-c, --style [css]', 'Your css lang, default is scss', /^(css|scss|sass)$/i, 'scss')
  .on('--help', function() {
    console.log();
    console.log('  Examples:');
    console.log();
    console.log('    $ vt g components/foo');
    console.log('    $ vt g components/bar --tsx');
    console.log();
  })
  .action(function (componentName, options) {
    console.log(options.tsx);
    console.log(options.style);
    let componentRelativePath = './';
    let componentActualName = componentName;
    if (componentName.indexOf('/') > -1) {
      componentRelativePath = componentName.substring(0, componentName.lastIndexOf('/'));
      componentActualName = componentName.substring(componentName.lastIndexOf('/') + 1);
    }
    console.log(`vt will generate a component called ${componentActualName}` );
    const fileDir = targetFileDir(componentRelativePath, componentActualName, options.src);
    const { vueFile, tsFile } = generateComponentFiles(componentActualName, fileDir, options.tsx, options.style);
    if (vueFile && tsFile) {
      console.log(chalk.bold.cyan('File created: ') +  chalk.default.green(path.relative(process.cwd(), vueFile)));
      console.log(chalk.bold.cyan('File created: ') +  chalk.default.green(path.relative(process.cwd(), tsFile)));
    }
  })
  .parse(process.argv);



   
/**
 * [done] Check if there is src, use src as root, if not will use the current directory as root
 *  Check if there the componentName contains a path, 
 * if it is mkdir -p the path or go to the path
 */
function targetFileDir(componentRelativePath, componentName, srcDir) {
  const currentPath = process.cwd();
  let targetPath = currentPath; 
  if (fs.existsSync(path.join(targetPath, srcDir))) {
    targetPath = path.join(targetPath, srcDir);
  } else if(srcDir !== 'src') {
    console.warn(chalk.default.yellow(`The specified source dir ${srcDir} does not exists, will create the component under current directory`));
  }
  targetPath = path.join(targetPath, componentRelativePath);
  if (!fs.existsSync(targetPath)){
    mkdirp.sync(targetPath);
  }
  return targetPath;
}


function generateComponentFiles (componentName, fileDir, isTsx, styleLang) {
  const componentFileName = componentName;
  const scriptType = isTsx ? 'tsx': 'ts';
  const styleType = styleLang;
  vueFilePath = path.join(fileDir, `${componentFileName}.vue`);
  tsFilePath = path.join(fileDir, `${componentName}.${scriptType}`);

  if (fs.existsSync(vueFilePath)) {
    console.error(chalk.bold.red(`Vue file already exists: ${path.relative(process.cwd(), vueFilePath)}, will stop generation. `));
    return {undefined, undefined};
  } else if (fs.existsSync(tsFilePath)) {
    console.error(chalk.bold.red(`Ts file already exists: ${path.relative(process.cwd(), tsFilePath)}, will stop generation.`));
    return {undefined, undefined};
  }
  const vueFile = generateFileWithTplFile(vueFileTpl, { scriptType, styleType, componentFileName, componentName }, vueFilePath);
  const tsFile = generateFileWithTplFile(tsFileTpl, { componentName }, tsFilePath);
  return {vueFile, tsFile};
 
}


function generateFileWithTplFile (tplFilePath, data, filePath) {
  const fileTpl = fs.readFileSync(path.join(__dirname, tplFilePath), 'utf-8');
  const fileContent = _.template(fileTpl)(data);
  fs.writeFileSync(filePath, fileContent);
  return filePath;
}





