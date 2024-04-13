const prompt_shell = require('prompt-sync')();

type QuestionType = "MULTIPLE_SELECT" | "INPUT" | "SELECT"


type Option = {
    title: string;
    children?: Question[]
}

type Question = {
    title: string;
    options: Option[];
    type: QuestionType,
}

const questions: Question[] = [
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

function renderQuestions(questions: Question[]): any {
    const results: any[] = [];

    for (const question of questions) {
        console.log(question.title);

        if (question.type === "INPUT") {
            results.push(renderInput(question));
        }

        if (question.type === "SELECT") {
            results.push(renderSelect(question))
        }

        if (question.type === "MULTIPLE_SELECT") {
            results.push(renderMultiSelect(question))
        }
    }

    return results;
}

function renderInput(question: Question): any {
    const inputs: any[] = [];

    for (const option of question.options) {
        const response = prompt_shell(`${option.title}: `)
        
        if (option.children) {
            inputs.push({ title: option.title, response, children: renderQuestions(option.children) })
        } else {
            inputs.push({ title: option.title, response });
        }
    }

    return { title: question.title, results: inputs };
}

function renderSelect(question: Question): any {
    question.options.forEach((option, index) => console.log(`alternativa [${index+1}]: ${option.title}`));

    const response = prompt_shell("Digite o numero da alternativa: ")
    const selected = question.options[response - 1];

    if (selected.children) {
        return { title: question.title, results: selected.title, children: renderQuestions(selected.children) }
    }

    return { title: question.title, results: selected.title };
}

function renderMultiSelect(question: Question): any {
    const results: any[] = [];

    question.options.forEach((option, index) => console.log(`alternativa [${index+1}]: ${option.title}`));

    const response: string = prompt_shell("Digite as alternativas separadas por ',': ")
    
    for (const index of response.split(',')) {
        const selected = question.options[Number(index) - 1];

        if (selected.children) {
            results.push({ title: selected.title, children: renderQuestions(selected.children) })
        } else {
            results.push({ title: selected.title });
        }
    }

    return { title: question.title, results };
}

const results = renderQuestions(questions);

console.log(JSON.stringify(results, null, 4));