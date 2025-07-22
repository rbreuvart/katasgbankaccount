
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import accountController from './controller/account.controller';

const app = express();
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Bank Account API',
      version: '1.0.0',
      description: 'Bank Account API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/index.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));




/**
 * @swagger
 * /account/{accountNumber}:
 *   post:
 *     summary: Create a new account
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         schema:
 *           type: string
 *     
 *     responses:
 *       200:
 *         description: account created
 *       400:
 *         description: Bad request
 */
app.post('/account/:accountNumber', accountController.createAccount);


/**
 * @swagger
 * /accounts/{accountNumber}/deposit:
 *   post:
 *     summary: Deposit money into a specific account
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Deposit successful
 *       400:
 *         description: Bad request
 */
app.post('/accounts/:accountNumber/deposit', accountController.deposit);

/**
 * @swagger
 * /accounts/{accountNumber}/withdraw:
 *   post:
 *     summary: Withdraw money from a specific account
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Withdrawal successful
 *       400:
 *         description: Bad request
 */
app.post('/accounts/:accountNumber/withdraw', accountController.withdraw);

/**
 * @swagger
 * /accounts/{accountNumber}/history:
 *   get:
 *     summary: Get the transaction history for a specific account
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of movements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   amount:
 *                     type: number
 *                   balance:
 *                     type: number
 */
app.get('/accounts/:accountNumber/history', accountController.getHistory);





/**
 * @swagger
 * /accounts/{accountNumber}/print:
 *   get:
 *     summary: Get the transaction history for a specific account
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of movements
 *         content:
 *           application/text:
 *             schema:
 *               type: string
 *               example: 'Date: 2023-01-01, Amount: 100, Balance: 100\nDate: 2023-02-01, Amount: 200, Balance: 300\n'
 */
app.get('/accounts/:accountNumber/print', accountController.getPrintStatement);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

