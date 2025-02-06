const puppeteer = require('puppeteer');
const { preencherFormulario } = require('./utils/formFilter');

async function run() {
  const browser = await puppeteer.launch({ headless: false });  // Rodar o navegador de forma visível
  const page = await browser.newPage();
  await page.goto('https://visa.vfsglobal.com/ago/en/prt/register');  // URL do formulário

  // Aceitar os cookies
  await page.evaluate(() => {
    const acceptButton = Array.from(document.querySelectorAll('button'))
      .find(button => button.textContent.includes('Aceitar todos os cookies'));
    if (acceptButton) {
      acceptButton.click();
    }
  });

  console.log('Cookies aceitos!');

  // Dados fictícios para preencher o formulário
    const dados = {
        email: 'jane.doe@email.com',
        senha: 'Senha@1234',  // Senha forte com pelo menos 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial
        confirmarSenha: 'Senha@1234',  // A confirmação de senha deve ser igual
    };


  // Preencher o formulário
  await preencherFormulario(page, dados);

  
}

run();
