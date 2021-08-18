/*jshint esversion: 6 */
Vue.use(VueMarkdown);
/* 
 Original source owner https://github.com/arturssmirnovs
 Current file owner https://github.com/KasRoudra
*/
Vue.component('custom-input', {
    props: ['value', 'title', 'placeholder', 'brand'],
    template: `
  <div class="form-group">
    <label :for="title">
      <img v-if="brand" :src="'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/'+brand+'.svg'" :alt="brand" height='30'> &nbsp;
      {{ title }}
    </label>
    <input type="text" class="form-control" :value="value" @input="$emit('input', $event.target.value)" :aria-describedby="title" :placeholder="placeholder" />
  </div>
  `
});

Vue.component('theme-option', {
    props: ['optionId', 'value', 'label'],
    template: `
        <div class="custom-control custom-radio">
            <input class="custom-control-input" type="radio" :id="optionId" :value="value" v-model="data.theme" v-on:change="changeTheme" checked v-if="optionId === 'themeDefault'">
            <input class="custom-control-input" type="radio" :id="optionId" :value="value" v-model="data.theme" v-on:change="changeTheme" v-else>
            <label class="custom-control-label" :for="optionId">{{ label }}</label>
        </div>
    `
});

new Vue({
    el: '#app',
    data: function () {
        return {
            forced: false,
            tab: "header",
            data: {
                language: "en",
                theme: "default",
                title: "Repository-Readme-Generator",
                subtitle: "Generate beautiful Repository Readme",
                text: "Repository readme generator is a tool that allows you to create simple and beautiful readme for your repository that you can copy/paste/download.",

                banner: "images/banner.png",
                
                stars: false,
                forks: false,
                repocard: false,
                license: false,
                issues: false,
                contributors: false,

                username: "",
                repo: "",
                author: "",
                opensource: "",
                madein: "",
                planguage: "",

                installation1: "",
                installation2: "",
                installation3: "",
                installation4: "",
                usage1: "",
                usage2: "",
                usage3: "",
                usage4: "",
                
                features1: "",
                features2: "",
                features3: "",
                features4: "",
                requirement1: "",
                requirement2: "",
                requirement3: "",
                requirement4: "",
                screenshot: "",

                disclaimer: "",
                credit1: "",
                credit2: "",
                email: "",
                fb: "",

                items: [],
            },
            source: "",
            translator: null
        };
    },
    watch: {
        data: {
            deep: true,
            handler() {
                this.forced = false;
                this.username = this.githubWatcher(this.data.username);
                this.source = this.getSource(this.data);
            }
        }
    },
    mounted: function(){
        this.source = this.getSource(this.data);
        this.addItem();
    },
    methods: {
        githubWatcher(username) {
            if (!username) {
                this.data.stars = false;
                this.data.forks = false;
                this.data.repocard = false;
                this.data.issues = false;
                this.data.license = false;
                this.data.contributors = false;
            }

            return username;
        },
        addItem() {
            this.data.items.push({
                title: '',
                value: ''
            });
        },
        changeTheme() {
            console.log('heyyy!');
        },
        onKeyUp(event) {
            this.forced = true;
        },
        slugify(text) {
            return text.toString().toLowerCase()
                .replace(/\.+/g, '-dot-')
                .replace(/\s+/g, '')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '')
                .replace(/^-+/, '')
                .replace(/-+$/, '');
        },
        getSource: function (data) {
            let source = '';

            if (data) {
                
                if (data.title) {
                    source += `<h2 align="center"><u>${data.title}</u></h2>`;
                    source += "\n\n";
                }
                
                if (data.banner) {
                    source += `![${data.subtitle}](${data.banner})`;
                    source += "\n";
                }  
                
                if (data.subtitle) {
                    source += `<h4 align="center"> ${data.subtitle} </h4>`;
                    source += "\n\n";
                }

                source += `<p align="center">\n`;
                if ((data.repo && data.username) && data.stars) {
                    source += `    <img src="https://img.shields.io/github/stars/${data.username}/${data.repo}?style=for-the-badge&color=orange">`;
                    source += "\n";
                }

                if ((data.repo && data.username) && data.forks) {
                    source += `    <img src="https://img.shields.io/github/forks/${data.username}/${data.repo}?style=for-the-badge&color=purple">`;
                    source += "\n";
                }
                
                if ((data.repo && data.username) && data.license) {
                    source += `    <img src="https://img.shields.io/github/license/${data.username}/${data.repo}?style=for-the-badge&color=blue">`;
                    source += "\n";
                }
                
                if ((data.repo && data.username) && data.issues) {
                    source += `    <img src="https://img.shields.io/github/issues/${data.username}/${data.repo}?style=for-the-badge&color=red">`;
                    source += "\n";
                }
                
                if ((data.repo && data.username) && data.contributors) {
                    source += `    <img src="https://img.shields.io/github/contributors/${data.username}/${data.repo}?style=for-the-badge&color=cyan">`;
                    source += "\n";
                }                
                source += `<br>\n`;
                
                if (data.author) {
                    source += `    <img src="https://img.shields.io/badge/Author-${data.author}-magenta?style=flat-square">\n`;
                }
                                
                if (data.opensource) {
                    source += `    <img src="https://img.shields.io/badge/Open%20Source-${data.opensource}-orange?style=flat-square">\n`;
                }
                                
                if (data.maintained) {
                    source += `    <img src="https://img.shields.io/badge/Maintained-${data.maintained}-cyan?style=flat-square">\n`;
                }
                                
                if (data.madein) {
                    source += `    <img src="https://img.shields.io/badge/Made%20In-${data.madein}-green?style=flat-square">\n`;
                }
                                
                if (data.planguage) {
                    source += `    <img src="https://img.shields.io/badge/Written%20In-${data.planguage}-blue?style=flat-square">\n`;
                }
                if (data.username && data.repo && data.repocard){
                    source += `<br>\n    <img src="https://github-readme-stats.vercel.app/api/pin/?username=${data.username}&repo=${data.repo}&theme=synthwave">\n`;
                }
                source += `</p>\n\n`;
                if (data.text) {
                    source += "### [+] Description\n";
                    source += data.text;
                    source += "\n\n";
                }
                
                if (data.installation1 && !data.installation2 && !data.installation3 && !data.installation4) {
                    source += "### [+] Installation\n`"+data.installation1+"`\n\n";
                }
                
                if (data.installation2 && !data.installation3 && !data.installation4 && !data.installation1) {
                    source += "### [+] Installation\n`"+data.installation2+"`\n\n";
                }
                
                if (data.installation3 && !data.installation4 && !data.installation1 && !data.installation2) {
                    source += "### [+] Installation\n`"+data.installation3+"`\n\n";
                }
                
                if (data.installation4 && !data.installation1 && !data.installation2 && !data.installation3) {
                    source += "### [+] Installation\n`"+data.installation4+"`\n\n";
                }               
                if (data.installation1 && data.installation2 && !data.installation3 && !data.installation4){
                    source += "### [+] Installation\n - `"+data.installation1+"`\n - `"+data.installation2+"`\n\n";
                }
                
                if (data.installation2 && data.installation3 && !data.installation4 && !data.installation1){
                    source += "### [+] Installation\n - `"+data.installation2+"`\n - `"+data.installation3+"`\n\n";
                }                

                if (data.installation3 && data.installation4 && !data.installation1 && !data.installation2){
                    source += "### [+] Installation\n - `"+data.installation3+"`\n - `"+data.installation4+"`\n\n";
                }
                
                if (data.installation4 && data.installation1 && !data.installation2 && !data.installation3){
                    source += "### [+] Installation\n - `"+data.installation1+"`\n - `"+data.installation4+"`\n\n";
                }
                
                if (data.installation1 && data.installation3 && !data.installation2 && !data.installation4){
                    source += "### [+] Installation\n - `"+data.installation1+"`\n - `"+data.installation3+"`\n\n";
                }
                
                if (data.installation2 && data.installation4 && !data.installation1 && !data.installation3){
                    source += "### [+] Installation\n - `"+data.installation2+"`\n - `"+data.installation4+"`\n\n";
                }
                
                if (data.installation1 && data.installation2 && data.installation3 && !data.installation4){
                    source += "### [+] Installation\n - `"+data.installation1+"`\n - `"+data.installation2+"`\n - `"+data.installation3+"`\n\n";
                }

                if (data.installation2 && data.installation3 && data.installation4 && !data.installation1){
                    source += "### [+] Installation\n - `"+data.installation2+"`\n - `"+data.installation3+"`\n - `"+data.installation4+"`\n\n";
                }

                if (data.installation1 && data.installation2 && data.installation4 && !data.installation3){
                    source += "### [+] Installation\n - `"+data.installation1+"`\n - `"+data.installation2+"`\n - `"+data.installation4+"`\n\n";
                }
                
                if (data.installation1 && data.installation3 && data.installation4 && !data.installation2){
                    source += "### [+] Installation\n - `"+data.installation1+"`\n - `"+data.installation3+"`\n - `"+data.installation4+"`\n\n";
                }

                if (data.installation1 && data.installation2 && data.installation3 && data.installation4){
                    source += "### [+] Installation\n - `"+data.installation1+"`\n - `"+data.installation2+"`\n - `"+data.installation3+"`\n - `"+data.installation4+"`\n\n";
                }
                if (data.usage1 && !data.usage2 && !data.usage3 && !data.usage4) {
                    source += "### [+] Usage\n`"+data.usage1+"`\n\n";
                }
                
                if (data.usage2 && !data.usage3 && !data.usage4 && !data.usage1) {
                    source += "### [+] Usage\n`"+data.usage2+"`\n\n";
                }
                
                if (data.usage3 && !data.usage4 && !data.usage1 && !data.usage2) {
                    source += "### [+] Usage\n`"+data.usage3+"`\n\n";
                }
                
                if (data.usage4 && !data.usage1 && !data.usage2 && !data.usage3) {
                    source += "### [+] Usage\n`"+data.usage4+"`\n\n";
                }               
                if (data.usage1 && data.usage2 && !data.usage3 && !data.usage4){
                    source += "### [+] Usage\n - `"+data.usage1+"`\n - `"+data.usage2+"`\n\n";
                }
                
                if (data.usage2 && data.usage3 && !data.usage4 && !data.usage1){
                    source += "### [+] Usage\n - `"+data.usage2+"`\n - `"+data.usage3+"`\n\n";
                }                

                if (data.usage3 && data.usage4 && !data.usage1 && !data.usage2){
                    source += "### [+] Usage\n - `"+data.usage3+"`\n - `"+data.usage4+"`\n\n";
                }
                
                if (data.usage4 && data.usage1 && !data.usage2 && !data.usage3){
                    source += "### [+] Usage\n - `"+data.usage1+"`\n - `"+data.usage4+"`\n\n";
                }
                
                if (data.usage1 && data.usage3 && !data.usage2 && !data.usage4){
                    source += "### [+] Usage\n - `"+data.usage1+"`\n - `"+data.usage3+"`\n\n";
                }
                
                if (data.usage2 && data.usage4 && !data.usage1 && !data.usage3){
                    source += "### [+] Usage\n - `"+data.usage2+"`\n - `"+data.usage4+"`\n\n";
                }
                
                if (data.usage1 && data.usage2 && data.usage3 && !data.usage4){
                    source += "### [+] Usage\n - `"+data.usage1+"`\n - `"+data.usage2+"`\n - `"+data.usage3+"`\n\n";
                }

                if (data.usage2 && data.usage3 && data.usage4 && !data.usage1){
                    source += "### [+] Usage\n - `"+data.usage2+"`\n - `"+data.usage3+"`\n - `"+data.usage4+"`\n\n";
                }

                if (data.usage1 && data.usage2 && data.usage4 && !data.usage3){
                    source += "### [+] Usage\n - `"+data.usage1+"`\n - `"+data.usage2+"`\n - `"+data.usage4+"`\n\n";
                }
                
                if (data.usage1 && data.usage3 && data.usage4 && !data.usage2){
                    source += "### [+] Usage\n - `"+data.usage1+"`\n - `"+data.usage3+"`\n - `"+data.usage4+"`\n\n";
                }

                if (data.usage1 && data.usage2 && data.usage3 && data.usage4){
                    source += "### [+] Usage\n - `"+data.usage1+"`\n - `"+data.usage2+"`\n - `"+data.usage3+"`\n - `"+data.usage4+"`\n\n";
                }

                if (data.screenshot){
                    source += `### [+] Screenshot\n![screenshot](${data.screenshot})\n\n`;
                }
                
                if (data.features1 && !data.features2 && !data.features3 && !data.features4) {
                    source += `### [+] Features\n${data.features1}\n\n`;
                }
                
                if (data.features2 && !data.features3 && !data.features4 && !data.features1) {
                    source += `### [+] Features\n${data.features2}\n\n`;
                }
                
                if (data.features3 && !data.features4 && !data.features1 && !data.features2) {
                    source += `### [+] Features\n${data.features3}\n\n`;
                }
                
                if (data.features4 && !data.features1 && !data.features2 && !data.features3) {
                    source += `### [+] Features\n${data.features4}\n\n`;
                }               
                if (data.features1 && data.features2 && !data.features3 && !data.features4){
                    source += `### [+] Features\n - ${data.features1}\n - ${data.features2}\n\n`;
                }
                
                if (data.features2 && data.features3 && !data.features4 && !data.features1){
                    source += `### [+] Features\n - ${data.features2}\n - ${data.features3}\n\n`;
                }                

                if (data.features3 && data.features4 && !data.features1 && !data.features2){
                    source += `### [+] Features\n - ${data.features3}\n - ${data.features4}\n\n`;
                }
                
                if (data.features4 && data.features1 && !data.features2 && !data.features3){
                    source += `### [+] Features\n - ${data.features1}\n - ${data.features4}\n\n`;
                }
                
                if (data.features1 && data.features3 && !data.features2 && !data.features4){
                    source += `### [+] Features\n - ${data.features1}\n - ${data.features3}\n\n`;
                }
                
                if (data.features2 && data.features4 && !data.features1 && !data.features3){
                    source += `### [+] Features\n - ${data.features2}\n - ${data.features4}\n\n`;
                }
                
                if (data.features1 && data.features2 && data.features3 && !data.features4){
                    source += `### [+] Features\n - ${data.features1}\n - ${data.features2}\n - ${data.features3}\n\n`;
                }

                if (data.features2 && data.features3 && data.features4 && !data.features1){
                    source += `### [+] Features\n - ${data.features2}\n - ${data.features3}\n - ${data.features4}\n\n`;
                }

                if (data.features1 && data.features3 && data.features4 && !data.features2){
                    source += `### [+] Features\n - ${data.features1}\n - ${data.features3}\n - ${data.features4}\n\n`;
                }

                if (data.features1 && data.features2 && data.features4 && !data.features3){
                    source += `### [+] Features\n - ${data.features1}\n - ${data.features2}\n - ${data.features4}\n\n`;
                }

                if (data.features1 && data.features2 && data.features3 && data.features4){
                    source += `### [+] Features\n - ${data.features1}\n - ${data.features2}\n - ${data.features3}\n - ${data.features4}\n\n`;
                }

                if (data.requirement1 && !data.requirement2 && !data.requirement3 && !data.requirement4) {
                    source += `### [+] Requirements\n${data.requirement1}\n\n`;
                }
                
                if (data.requirement2 && !data.requirement3 && !data.requirement4 && !data.requirement1) {
                    source += `### [+] Requirements\n${data.requirement2}\n\n`;
                }
                
                if (data.requirement3 && !data.requirement4 && !data.requirement1 && !data.requirement2) {
                    source += `### [+] Requirements\n${data.requirement3}\n\n`;
                }
                
                if (data.requirement4 && !data.requirement1 && !data.requirement2 && !data.requirement3) {
                    source += `### [+] Requirements\n${data.requirement4}\n\n`;
                }               
                if (data.requirement1 && data.requirement2 && !data.requirement3 && !data.requirement4){
                    source += `### [+] Requirements\n - ${data.requirement1}\n - ${data.requirement2}\n\n`;
                }
                
                if (data.requirement2 && data.requirement3 && !data.requirement4 && !data.requirement1){
                    source += `### [+] Requirements\n - ${data.requirement2}\n - ${data.requirement3}\n\n`;
                }                

                if (data.requirement3 && data.requirement4 && !data.requirement1 && !data.requirement2){
                    source += `### [+] Requirements\n - ${data.requirement3}\n - ${data.requirement4}\n\n`;
                }
                
                if (data.requirement4 && data.requirement1 && !data.requirement2 && !data.requirement3){
                    source += `### [+] Requirements\n - ${data.requirement1}\n - ${data.requirement4}\n\n`;
                }
                
                if (data.requirement1 && data.requirement3 && !data.requirement2 && !data.requirement4){
                    source += `### [+] Requirements\n - ${data.requirement1}\n - ${data.requirement3}\n\n`;
                }
                
                if (data.requirement2 && data.requirement4 && !data.requirement1 && !data.requirement3){
                    source += `### [+] Requirements\n - ${data.requirement2}\n - ${data.requirement4}\n\n`;
                }
                
                if (data.requirement1 && data.requirement2 && data.requirement3 && !data.requirement4){
                    source += `### [+] Requirements\n - ${data.requirement1}\n - ${data.requirement2}\n - ${data.requirement3}\n\n`;
                }

                if (data.requirement2 && data.requirement3 && data.requirement4 && !data.requirement1){
                    source += `### [+] Requirements\n - ${data.requirement2}\n - ${data.requirement3}\n - ${data.requirement4}\n\n`;
                }

                if (data.requirement1 && data.requirement3 && data.requirement4 && !data.requirement2){
                    source += `### [+] Requirements\n - ${data.requirement1}\n - ${data.requirement3}\n - ${data.requirement4}\n\n`;
                }

                if (data.requirement1 && data.requirement2 && data.requirement4 && !data.requirement3){
                    source += `### [+] Requirements\n - ${data.requirement1}\n - ${data.requirement2}\n - ${data.requirement4}\n\n`;
                }

                if (data.requirement1 && data.requirement2 && data.requirement3 && data.requirement4){
                    source += `### [+] Requirements\n - ${data.requirement1}\n - ${data.requirement2}\n - ${data.requirement3}\n - ${data.requirement4}\n\n`;
                }
                let index =0;
                for (; index < data.items.length; ++index) {
                    if (data.items[index].title && data.items[index].value) {
                        let title = this.slugify(data.items[index].title);
                        let value = data.items[index].value;
                        source += `### [+] ${title}\n${value}\n\n`;
                    }
                }
                
                if (data.credit1 && data.credit2){
                    source += `### [+] Credits \n<a href="${data.credit2}">${data.credit1}</a>\n\n`;
                }
                
                if (data.credit1 && !data.credit2){
                    source += `### [+] Credits \n ${data.credit1}\n\n`;
                }
                
                if (!data.credit1 && data.credit2){
                    source += `### [+] Credits \n<a href="${data.credit2}">${data.credit2}</a>\n\n`;
                }
                
                if (data.disclaimer) {
                    source += `### [+] Disclaimer \n${data.disclaimer}\n\n`;
                }
                if (data.fb && !data.email){
                    source += `### [+] Find me on \n<a href="https://m.me/${data.fb}" target="_blank"><img src="https://img.shields.io/badge/Messenger-${data.fb}-blue?style=for-the-badge&logo=messenger"></a>\n\n`;
                }
                if (data.email && !data.fb){
                    source += `### [+] Find me on \n<a href="mailto:${data.email}" target="_blank"><img src="https://img.shields.io/badge/Email-${data.email}-blue?style=for-the-badge&logo=gmail"></a>\n\n`;
                }
                if (data.email && data.fb){
                    source += `### [+] Find me on \n<a href="mailto:${data.email}" target="_blank"><img src="https://img.shields.io/badge/Email-${data.email}-blue?style=for-the-badge&logo=gmail"></a>\n\n`;
                    source += `<a href="https://m.me/${data.fb}" target="_blank"><img src="https://img.shields.io/badge/Messenger-${data.fb}-blue?style=for-the-badge&logo=messenger"></a>\n\n`;
                }
               
            }

            return source;
        },
        copyCode() {
            this.$refs.code.select();
            document.execCommand("copy");
        },
        download() {
            var data1 = this.source;
            var c = document.createElement("a");
            c.download = "README.md";

            var t = new Blob([data1], {
                 type: "text/plain"
            });
            c.href = window.URL.createObjectURL(t);
            c.click();
        }
    }
});
