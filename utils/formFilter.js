const puppeteer = require('puppeteer-extra');
const puppeteerExtraPluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(puppeteerExtraPluginStealth()); // Camuflagem para evitar a detecção de bots

// Função de delay aleatório
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function preencherFormulario(page, dados) {
    // Alterando o User-Agent para simular um navegador real
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Aceitação de cookies
    await page.waitForSelector('button', { visible: true });
    let tentativas = 0;
    let sucessoCookies = false;

    while (tentativas < 3 && !sucessoCookies) {
        try {
            await page.evaluate(() => {
                const acceptButton = Array.from(document.querySelectorAll('button'))
                    .find(button => button.textContent.includes('Aceitar todos os cookies'));
                
                if (acceptButton) {
                    acceptButton.click();
                }
            });

            console.log("Tentativa de aceitar cookies...");
            await page.waitForSelector('button', { hidden: true, timeout: 1000 });

            sucessoCookies = true;
            console.log("Cookies aceitos!");
        } catch (error) {
            tentativas++;
            console.log(`Falha na aceitação de cookies, tentativa ${tentativas}...`);
            if (tentativas >= 3) {
                console.log("Falha ao aceitar cookies após 3 tentativas.");
            }
        }
    }

    console.log("Dados do formulário:", dados);

    // Preenchimento de campos de formulário com atraso aleatório
    try {
        await page.waitForSelector('input#inputEmail', { visible: true, timeout: 5000 });
        await page.type('input#inputEmail', dados.email);
        console.log("Email preenchido.");
        await delay(200 + Math.random() * 200); // Atraso aleatório
    } catch (err) {
        console.log("Erro ao preencher o campo de email:", err);
    }

    try {
        await page.waitForSelector('#password', { visible: true });
        await page.focus('#password');  
        await page.type('#password', dados.senha);  
        console.log("Senha preenchida.");
        await delay(200 + Math.random() * 200); // Atraso aleatório
    } catch (err) {
        console.log("Erro ao preencher o campo de senha:", err);
    }

    try {
        await page.waitForSelector('#confirmPassword', { visible: true });
        await page.focus('#confirmPassword');  
        await page.type('#confirmPassword', dados.confirmarSenha);  
        console.log("Confirmação de senha preenchida.");
        await delay(200 + Math.random() * 200); // Atraso aleatório
    } catch (err) {
        console.log("Erro ao preencher o campo de confirmação de senha:", err);
    }

    // Marcar os checkboxes com atraso e simular um clique humano
    try {
        await page.waitForSelector('input#mat-mdc-checkbox-1-input', { visible: true });
        await page.click('input#mat-mdc-checkbox-1-input');
        console.log("Checkbox 1 marcado.");
        await delay(300 + Math.random() * 300); // Atraso aleatório
    } catch (err) {
        console.log("Erro ao marcar checkbox 1:", err);
    }

    try {
        await page.waitForSelector('input#mat-mdc-checkbox-2-input', { visible: true });
        await page.click('input#mat-mdc-checkbox-2-input');
        console.log("Checkbox 2 marcado.");
        await delay(300 + Math.random() * 300); // Atraso aleatório
    } catch (err) {
        console.log("Erro ao marcar checkbox 2:", err);
    }

    try {
        await page.waitForSelector('input#mat-mdc-checkbox-3-input', { visible: true });
        await page.click('input#mat-mdc-checkbox-3-input');
        console.log("Checkbox 3 marcado.");
        await delay(300 + Math.random() * 300); // Atraso aleatório
    } catch (err) {
        console.log("Erro ao marcar checkbox 3:", err);
    }

    // Simulando movimento do mouse para enganar a detecção de bot
    await page.mouse.move(100, 100);
    await page.mouse.down();
    await page.mouse.up();
    await page.mouse.move(200, 200);
    await delay(500 + Math.random() * 500); // Atraso para simular navegação humana

    // Simulando rolagem na página (comportamento humano)
    await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
    });

    // Não está submetendo o formulário, apenas preenchendo os campos
    console.log("Formulário preenchido, mas não enviado.");
}

module.exports = { preencherFormulario };
