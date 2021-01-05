
import SynchronizationEngine from './core/SynchronizationEngine'

import configuration from './config'
import ActionFactory from './core/actionFactory'


// export const handler = async () =>{
//     const asanaClient = null
//     const actionFactory = new ActionFactory()
//     const synchronizationEngine = new SynchronizationEngine(configuration, actionFactory, asanaClient)

//     synchronizationEngine.processPullRequest()
// }
export const handler = async (event) => {
    return { body: JSON.stringify({ message: JSON.stringify(event) }), statusCode: 200 };
  };