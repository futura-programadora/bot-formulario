async function preencherFormulario(page, dados) {
    await page.waitForSelector('button', { visible: true });

    let tentativas = 0;
    let sucessoCookies = false;

    // Aceitação de cookies (já ajustado no seu código)
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
            await page.waitForSelector('button', { hidden: true, timeout: 2000 });

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

    // Preenchimento de campos de formulário com tratamento de visibilidade
    try {
        await page.waitForSelector('input#inputEmail', { visible: true, timeout: 5000 });
        await page.type('input#inputEmail', dados.email);
        console.log("Email preenchido.");
    } catch (err) {
        console.log("Erro ao preencher o campo de email:", err);
    }

    // Preenchendo o campo de senha com o id "password"
    try {
        await page.waitForSelector('#password', { visible: true });
        await page.focus('#password');  // Foca no campo de senha
        await page.type('#password', dados.senha);  // Preenche o campo
        console.log("Senha preenchida.");
    } catch (err) {
        console.log("Erro ao preencher o campo de senha:", err);
    }

    // Preenchendo o campo de confirmação de senha com o id "confirmPassword"
    try {
        await page.waitForSelector('#confirmPassword', { visible: true });
        await page.focus('#confirmPassword');  // Foca no campo de confirmação de senha
        await page.type('#confirmPassword', dados.confirmarSenha);  // Preenche o campo
        console.log("Confirmação de senha preenchida.");
    } catch (err) {
        console.log("Erro ao preencher o campo de confirmação de senha:", err);
    }

    // Marcar os checkboxes (mantenha como no seu código)
    try {
        await page.waitForSelector('input#mat-mdc-checkbox-1-input', { visible: true });
        await page.click('input#mat-mdc-checkbox-1-input');
        console.log("Checkbox 1 marcado.");
    } catch (err) {
        console.log("Erro ao marcar checkbox 1:", err);
    }

    try {
        await page.waitForSelector('input#mat-mdc-checkbox-2-input', { visible: true });
        await page.click('input#mat-mdc-checkbox-2-input');
        console.log("Checkbox 2 marcado.");
    } catch (err) {
        console.log("Erro ao marcar checkbox 2:", err);
    }

    try {
        await page.waitForSelector('input#mat-mdc-checkbox-3-input', { visible: true });
        await page.click('input#mat-mdc-checkbox-3-input');
        console.log("Checkbox 3 marcado.");
    } catch (err) {
        console.log("Erro ao marcar checkbox 3:", err);
    }

    // Não está submetendo o formulário, apenas preenchendo os campos
    console.log("Formulário preenchido, mas não enviado.");
}


module.exports = { preencherFormulario };
