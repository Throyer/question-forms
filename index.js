var prompt_shell = require('prompt-sync')();
var questions = [
    {
        title: "qual sua faixa etaria?",
        type: "SELECT",
        options: [
            {
                title: "Criança"
            },
            {
                title: "Adulto"
            },
            {
                title: "Idoso"
            },
        ]
    },
    {
        title: "Origem da queimadura",
        type: "SELECT",
        options: [
            {
                title: "Eletrica"
            },
            {
                title: "Friccao"
            },
            {
                title: "Solar"
            },
            {
                title: "Combustivel",
                children: [
                    {
                        title: "Material",
                        type: "SELECT",
                        options: [
                            {
                                title: "Alcool"
                            },
                            {
                                title: "Gasolina"
                            },
                        ]
                    },
                ]
            }
        ]
    },
    {
        title: "Percentual da area queimada",
        type: "INPUT",
        options: [
            {
                title: "Informe o percentual"
            },
        ]
    },
    {
        title: "Areas queimadas",
        type: "MULTIPLE_SELECT",
        options: [
            {
                title: "Rosto"
            },
            {
                title: "Mao"
            },
            {
                title: "Pes"
            },
            {
                title: "Braco"
            },
            {
                title: "Perna"
            },
        ]
    },
];
function renderQuestions(questions) {
    var results = [];
    for (var _i = 0, questions_1 = questions; _i < questions_1.length; _i++) {
        var question = questions_1[_i];
        console.log(question.title);
        if (question.type === "INPUT") {
            results.push(renderInput(question));
        }
        if (question.type === "SELECT") {
            results.push(renderSelect(question));
        }
        if (question.type === "MULTIPLE_SELECT") {
            results.push(renderMultiSelect(question));
        }
    }
    return results;
}
function renderInput(question) {
    var inputs = [];
    for (var _i = 0, _a = question.options; _i < _a.length; _i++) {
        var option = _a[_i];
        var response = prompt_shell("".concat(option.title, ": "));
        if (option.children) {
            inputs.push({ title: option.title, response: response, children: renderQuestions(option.children) });
        }
        else {
            inputs.push({ title: option.title, response: response });
        }
    }
    return { title: question.title, results: inputs };
}
function renderSelect(question) {
    question.options.forEach(function (option, index) { return console.log("alternativa [".concat(index + 1, "]: ").concat(option.title)); });
    var response = prompt_shell("Digite o numero da alternativa: ");
    var selected = question.options[response - 1];
    if (selected.children) {
        return { title: question.title, results: selected.title, children: renderQuestions(selected.children) };
    }
    return { title: question.title, results: selected.title };
}
function renderMultiSelect(question) {
    var selecteds = [];
    question.options.forEach(function (option, index) { return console.log("alternativa [".concat(index + 1, "]: ").concat(option.title)); });
    var response = prompt_shell("Digite as alternativas separadas por ',': ");
    for (var _i = 0, _a = response.split(','); _i < _a.length; _i++) {
        var index = _a[_i];
        var selected = question.options[Number(index) - 1];
        if (selected.children) {
            selecteds.push({ title: selected.title, children: renderQuestions(selected.children) });
        }
        else {
            selecteds.push({ title: selected.title });
        }
    }
    return { title: question.title, results: selecteds };
}
// const results: any[] = [];
// for (const question of questions) {
//     console.log(question.title, '\n');
//     if (question.type === "INPUT") {
//         const inputs: any[] = [];
//         for (const option of question.options) {
//             var response = prompt_shell(`${option.title}: `)
//             inputs.push({ title: option.title, response })
//         }
//         results.push({ title: question.title, results: inputs })
//     }
//     if (question.type === "SELECT") {
//         question.options.forEach((option, index) => console.log(`alternativa [${index+1}]: ${option.title}`));
//         var response = prompt_shell("Digite o numero da alternativa: ")
//         results.push({ title: question.title, results: question.options[response-1].title })
//     }
//     console.log('\n');
// }
var results = renderQuestions(questions);
console.log(JSON.stringify(results, null, 4));
