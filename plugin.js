const { execSync } = require('child_process');

/**
 * Grabs a password out of your MacOS keychain for a given account and service.
 */
module.exports.templateTags = [{
    name: 'keychain',
    displayName: 'Keychain Password',
    description: 'Access a password on your MacOS keychain',
    args: [
        {
            displayName: 'Service',
            description: 'Service where your account exists',
            type: 'string',
            defaultValue: 'foo'
        },
        {
            displayName: 'Account',
            description: 'Account in the service associated with your password',
            type: 'string',
            defaultValue: 'bar@foo.com'
        }
    ],
    async run(context, service, account) {
        if (process.platform !== 'darwin') {
          return "Only MacOS is currently supported."
        }
        return execSync(`security find-generic-password -a ${account} -s ${service} -w`, { stdio: 'pipe' })
          .toString()
          .trim();
    },
}];

/**
 * Lets you create a new secure value on your MacOS keychain
 */

module.exports.workspaceActions = [{
  label: 'Add value to Keychain',
  action: async (context, models) => {
    if (process.platform !== 'darwin') {
      context.app.alert('Sorry, only MacOS is currently supported');
    }
    const service = await context.app.prompt('Service', {
      lable: 'Service Name',
      defaultValue: 'insomnia-service',
    });
    const account = await context.app.prompt('Service Account', {
      lable: 'Service Account',
      defaultValue: 'foo@insomia.rest',
    });
    const password = await context.app.prompt('Account Password', {
      lable: 'Account Password',
      defaultValue: 'secret',
    });
    try {
      execSync(`security add-generic-password -a ${account} -s ${service} -w ${password}`)
      context.app.alert(`Saved password for ${account} in ${service}!`);
    } catch(err) {
      cotext.app.alert('Error saving password, try doing it manually?');
    }
  },
}]
