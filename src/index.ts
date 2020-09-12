import app from './app';
import colors from 'colors';
import './database';

async function Main() 
{
    try {
         await app.listen(app.get('port'));
         return `Server running on port ${colors.green(app.get('port'))}`;
    } catch (error) {
         console.log(`${error}`);
         throw new Error(`Error trying to connect with a server: ${error}`);
    }
}

Main()
     .then(response => {
         console.log(response);
     })
     .catch(error => {
         console.log(`${error}`);
     })
     .finally(() => console.log('Welcome to SosuaInformativo ApiRest Server!'));