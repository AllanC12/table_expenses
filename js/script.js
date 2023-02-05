const balanceElement = document.querySelector('#balance')
const expensesElement = document.querySelector('#money-minus')
const revenuesElement = document.querySelector('#money-plus')
const UlTransactions = document.querySelector('#transactions')
const form = document.querySelector('#form')
const transactionElementName = document.querySelector('#text')
const transactionElementValue = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorageTransactions !== null ? localStorageTransactions : []

const removeTransactions = ID => {
  transactions = transactions.filter(transaction => transaction.id !== ID)
  init()
}

const addTransactions = transaction => {
  const operator = transaction.value > 0 ? '+' : '-';
  const value = Math.abs(transaction.value)
  const name = transaction.name
  const li = document.createElement('li');
  const CSSClass = transaction.value > 0 ? 'plus' : 'minus'

  li.classList.add(CSSClass)
  li.innerHTML = `
   ${name} 
   <span> ${operator}R$ ${value}</span>
   <button class="delete-btn"onClick="removeTransactions(${transaction.id})">
      x
   </button>
  `
  UlTransactions.prepend(li)
}

const updateBalance = () => {
  const valuesTransactions = transactions
  .map(transaction => transaction.value)
  
  const total = valuesTransactions
  .reduce((accumulator,value)=> accumulator + value,0).toFixed(2)
  
  const expenses =Math.abs(valuesTransactions
    .filter(value => value < 0)
    .reduce((accumulator,value) => accumulator + value ,0)).toFixed(2)
    
    const revenues = valuesTransactions
    .filter(value => value > 0)
    .reduce((accumulator,value) => accumulator + value,0).toFixed(2)
    
    balanceElement.textContent = `R$ ${total}`
    expensesElement.textContent = `R$ ${expenses}`
    revenuesElement.textContent = `R$ ${revenues}`
  }

  const updateLocalStorage = () =>{
    localStorage.setItem('transactions',JSON.stringify(transactions))
  }
  
  const init = () => {
  UlTransactions.innerHTML = ''
  transactions.forEach(addTransactions)
  updateBalance()
}
init()



const generateID = () => Math.round(Math.random() *1000)

form.addEventListener('submit',event=>{
  event.preventDefault()
  if(transactionElementName.value.trim() === '' || transactionElementValue.value.trim() === ''){
    alert('Preencha todos os dados da transação (Nome e valor)')
  }
 
const transaction_name = transactionElementName.value;
const transaction_value = transactionElementValue.value

const transaction = {id: generateID(),
  name:transaction_name,
  value:Number(transaction_value)}

transactions.push(transaction)

console.log(transactions)


updateLocalStorage()
init()
transactionElementName.value = ''
transactionElementValue.value = ''
})