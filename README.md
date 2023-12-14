## Local testing with API
- Add mock service worker to `index.txs`
```
import { worker } from "./mocks/browser";

...

 worker.start();   
 ```

 ## Local testing
 ```
 npm start
 ```

 ## Generate dist bundle
 ```
 npm run build
 ```