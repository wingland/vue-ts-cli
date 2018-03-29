# Installation

```bash
npm install --global vue-ts-cli
vt help # Check command help mannual
```

# Usage

This command line tool faciliates the construction of Class-style Vue components if you are using `typescript` without mannually writing the scaffold for each component. 

Note: This command line is not for the ES6/JavaScript way of writing vue components.

For using typescript in Vue, please refer to the official document here: [TypeScript Support in Vue](https://vuejs.org/v2/guide/typescript.html).

There is a starter template, which you can use directly as the starter of your project:  [vue-ts-webpack-starter](https://github.com/wingland/vue-ts-webpack-starter),and use this cli tool to create your components in an easy way.

You can also reference [Typescript-Vue-Starter](https://github.com/Microsoft/TypeScript-Vue-Starter) provided by Microsoft for more details.


# Examples
```sh
vt generate Foo
vt g Foo #shorthand
````


This will generate a `Foo.ts` and a `Foo.vue` on current directory, if there is a `src` directory, the script will automatically generate the files under `src`

```sh
vt g components/Foo
```

This will create a `Foo.ts` and a `Foo.vue` under `components` ( or `src/components` if there is `src`), if `components` directory does not exsit, it will create components directory automatically. It will be useful for you to execute this commandline on the project root directory, where there is a `src` directory in most cases, and you don't need to cd to `src` or add `src` in the parameter.

```sh
vt g components/Foo --tsx #shorthand -x
```

This will create `Foo.tsx` and `Foo.vue` with `<script lang="tsx">`. Where you can write jsx syntanx.

```sh
vt g components/Foo --style css #shorthand -c css
```

The default style lang is scss, if you want to use css only or sass, specify that in style option.

```sh
vt g components/Foo --src uisrc #shorthand -s uisrc
```

Sometimes, you don't use `src` as the src dir. In this case, you can specify the one you are actually using. Here it will generate `Foo.ts` and `Foo.vue` files under `uisrc/components/`



