        window.addEventListener('DOMContentLoaded', function() {

            let UserText = document.getElementById('text-to-work');
            let UserSelectStap = document.getElementById('encrypt-step');
            let UserStep = Number(UserSelectStap.value);
            let result = document.getElementById('output');
            let Encrypt = document.getElementById('encrypt-btn');
            let Decrypt = document.getElementById('decrypt-btn');
            let Reset = document.getElementById('btn-reset');
            let TextToWork;
            let pos;

            let OtherSymbols = [' ', ',', '.', ':', ';', '!', '?', '-', '_', '=', '+', '(', ')', '[', ']', '@', '`', "'", '"', '<', '>', '|', '/', '%', '$', '^', '&', '*', '~'];
            let Numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            let EngAlfUp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            let EngAlfLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            let UkrAlfUp = ['А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'И', 'І', 'Ї', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ю', 'Я'];
            let UkrAlfLower = ['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я'];
            let EngAlfUpEncrypt = Array(26);
            let EngAlfLowerEncrypt = Array(26);
            let UkrAlfUpEncrypt = Array(33);
            let UkrAlfLowerEncrypt = Array(33);
            let NumbersEncrypt = Array(10);

            initEncrypt();

            UserSelectStap.addEventListener('change', function() {
                UserStep = Number(this.value);
                initEncrypt();
            });

            function initEncrypt() {
                UkrAlfUpEncrypt = CezarEncrypt(UserStep, UkrAlfUp);
                UkrAlfLowerEncrypt = CezarEncrypt(UserStep, UkrAlfLower);
                NumbersEncrypt = CezarEncrypt(UserStep, Numbers);
                EngAlfUpEncrypt = CezarEncrypt(UserStep, EngAlfUp);
                EngAlfLowerEncrypt = CezarEncrypt(UserStep, EngAlfLower);
            }


            function CezarEncrypt(stap, arr) {
                let CopyAlf = arr.slice();
                let i = 0;

                while ((i + stap) < (CopyAlf.length)) {
                    let buff = CopyAlf[i];
                    CopyAlf[i] = CopyAlf[i + stap];
                    CopyAlf[i + stap] = buff;
                    i++;
                }
                return CopyAlf;
            }


            function contains(symb, arr) {
                let letter = symb;
                pos = 0;
                for (let i = 0; i < arr.length; i++) {
                    if (letter === arr[i]) {
                        pos = i;
                        return true;
                        break;
                    }
                }
            }

            function encrypt(text) {
                let result = '';
                for (let i = 0; i <= text.length; i++) {
                    let symbol = text[i];
                    if (contains(symbol, OtherSymbols)) {
                        result += symbol;
                    }
                    if (contains(symbol, Numbers)) {
                        symbol = NumbersEncrypt[pos];
                        result += symbol;
                    }
                    if (contains(symbol, UkrAlfUp)) {
                        symbol = UkrAlfUpEncrypt[pos];
                        result += symbol;
                    }
                    if ((contains(symbol, UkrAlfLower))) {
                        symbol = UkrAlfLowerEncrypt[pos];
                        result += symbol;
                    }
                    if (contains(symbol, EngAlfUp)) {
                        symbol = EngAlfUpEncrypt[pos];
                        result += symbol;
                    }
                    if ((contains(symbol, EngAlfLower))) {
                        symbol = EngAlfLowerEncrypt[pos];
                        result += symbol;
                    }
                }
                return result;
            }

            function decrypt(text) {
                let result = '';
                for (let i = 0; i <= text.length; i++) {
                    let symbol = text[i];
                    if (contains(symbol, OtherSymbols)) {
                        result += symbol;
                    }
                    if (contains(symbol, NumbersEncrypt)) {
                        symbol = Numbers[pos];
                        result += symbol;
                    }
                    if (contains(symbol, UkrAlfUpEncrypt)) {
                        symbol = UkrAlfUp[pos];
                        result += symbol;
                    }
                    if ((contains(symbol, UkrAlfLowerEncrypt))) {
                        symbol = UkrAlfLower[pos];
                        result += symbol;
                    }
                    if (contains(symbol, EngAlfUpEncrypt)) {
                        symbol = EngAlfUp[pos];
                        result += symbol;
                    }
                    if ((contains(symbol, EngAlfLowerEncrypt))) {
                        symbol = EngAlfLower[pos];
                        result += symbol;
                    }

                }
                return result;
            }

            Encrypt.addEventListener('click', function() {
                TextToWork = UserText.value;
                result.value = encrypt(TextToWork);
            });
            Decrypt.addEventListener('click', function() {
                TextToWork = UserText.value;
                result.value = decrypt(TextToWork);
            });
            Reset.addEventListener('click', function() {
                UserText.value = '';
                result.value = '';
            });

        });
