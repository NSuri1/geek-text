const LogSeverity = {
  Info: 0,
  Warning: 1,
  Error: 2,
  Success: 3
};

const log = (message, severity) => {
  switch(severity) {
    case LogSeverity.Info:
      console.log(`\x1b[1;97m${message}\x1b[0m`);
      break;
    case LogSeverity.Warning:
      console.log(`\x1b[1;93m${message}\x1b[0m`);
      break;
    case LogSeverity.Error:
      console.log(`\x1b[1;91m${message}\x1b[0m`);
      break;
    case LogSeverity.Success:
      console.log(`\x1b[1;92m${message}\x1b[0m`);
      break;
    default:
      console.log(`\x1b[1;97m${message}\x1b[0m`);
      break;
  }
};

export { LogSeverity as Severity, log }
