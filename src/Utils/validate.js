const validateName = (name) => {
  const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{2,}$/;
  return regex.test(name);
};

function checaCPFRepetido(cpf) {
  const valoresRepetidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];

  let cpfValido = true;

  valoresRepetidos.forEach((valor) => {
    if (valor === cpf) {
      cpfValido = false;
    }
  });
  return cpfValido;
}

function confirmaDigito(soma) {
  return 11 - (soma % 11);
}

function checaDigitoVerificador(cpf, multiplicador) {
  if (multiplicador >= 12) {
    return true;
  }

  let multiplicadorInicial = multiplicador;
  let soma = 0;
  const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('');
  const digitoVerificador = cpf.charAt(multiplicador - 1);
  for (let contador = 0; multiplicadorInicial > 1; multiplicadorInicial -= 1, contador += 1) {
    soma += (cpfSemDigitos[contador] * multiplicadorInicial);
  }

  if ((parseInt(10, digitoVerificador) === confirmaDigito(soma)) || (digitoVerificador === 0 && confirmaDigito(soma) === 10)) {
    return checaDigitoVerificador(cpf, multiplicador + 1);
  }

  return false;
}

function checaEstruturaCPF(cpf) {
  const multiplicador = 10;

  return checaDigitoVerificador(cpf, multiplicador);
}

const validateCpf = (cpf) => {
  if (!checaCPFRepetido(cpf) || !checaEstruturaCPF(cpf)) {
    return false;
  }
  return true;
};

const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validatePhone = (phone) => {
  const regex = /^[0-9]{10,11}$/;
  return regex.test(phone);
};

const validateFeatures = (name, description, color) => {
  const errors = [];

  if (!name) {
    errors.push('invalid name');
  } if (!description) {
    errors.push('invalid description');
  } if (!color) {
    errors.push('invalid color');
  }

  return errors;
};

const validate = (name, cpf, email, phone, secondaryPhone) => {
  const err = [];

  if (!validateName(name)) {
    err.push('invalid name');
  } if (!validateCpf(cpf)) {
    err.push('invalid cpf');
  } if (!validateEmail(email)) {
    err.push('invalid email');
  } if (!validatePhone(phone)) {
    err.push('invalid phone');
  } if (!validatePhone(secondaryPhone)) {
    err.push('invalid secondary phone');
  }

  return err;
};

const validateActive = (active) => {
  const regex = /^(true|false)$/;
  return regex.test(active);
};

module.exports = { validate, validateActive, validateFeatures };
