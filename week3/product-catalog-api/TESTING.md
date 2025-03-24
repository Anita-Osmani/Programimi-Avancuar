1. Testing Strategy
Për të siguruar që API-ja funksionon siç duhet, kam ndjekur një strategji dyfishe për testim:
Teste të Njësisë (Unit Tests) :
Këto teste janë fokusuar në logjikën brenda metodave individuale, veçanërisht në src/services/product-service.js.
Testet përfshijnë raste pozitive dhe negative për secilën metodë, si getAllProducts, getProductById, createProduct, updateProduct, dhe deleteProduct.
Teste të Integrimit (Integration Tests) :
Këto teste verifikojnë ndërveprimin midis komponentëve të ndryshëm, duke përfshirë endpoint-et e API-së.
Testet përfshijnë kërkesat GET, POST, PUT, dhe DELETE për të siguruar që API-ja punon mirë me të gjitha pjesët e saj të kombinuara.
Mbulimi i Kodit :
Synova të arrisha një mbulim prej 80%+ për deklaratat (Stmts) dhe rreshtat e kodit (Lines).
Përdorë npm run test:coverage për të monitoruar mbulimin e kodit.
2. AI-Assisted Testing Process
AI Tools Used
ChatGPT : Përdorur për të gjeneruar teste bazike dhe për të zgjidhur sfida specifike.
GitHub Copilot : Përdorur për sugjerime të automatizuara gjatë shkrimit të kodeve të testeve.
Example Prompts
Këtu janë disa shembuj të prompteve që përdora për të gjeneruar teste:

Prompt për Teste të Njësisë :
"Generate unit tests for the getAllProducts method in the ProductService class. Include tests for filtering by category, price range, and in-stock status."
Prompt për Teste të Integrimit :
"Write integration tests for the POST /api/products endpoint that creates a new product. Include tests for successful creation and various validation error cases."
Prompt për Përmirësimin e Testeve :
"Help me improve test coverage for the updateProduct method. I need to test edge cases like updating a non-existent product and providing invalid updates."
Screenshots of AI-Generated Tests:
![Alt Text](./screenshots/test1.png)
![Alt Text](./screenshots/test2.png)
![Alt Text](./screenshots/test3.png)
![Alt Text](./screenshots/test4.png)
![Alt Text](./screenshots/test5.png)
