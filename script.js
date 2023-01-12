const balanceElement = document.querySelector('#balance')
const expensesElement = document.querySelector('#money-minus')
const revenuesElement = document.querySelector('#money-plus')
const UlTransactions = document.querySelector('#transactions')

const example_transactions = [
  {id: 1, name:'salário', value: 1200},
  {id: 2, name:'investimentos', value: 1000},
  {id: 3, name:'aluguel', value: -500},
  {id: 4, name:'viagem', value: -1200}
]

const addTransactions = transaction => {
  const operator = transaction.value > 0 ? '+' : '-';
  const value = Math.abs(transaction.value)
  const name = transaction.name
  const li = document.createElement('li');

  const CSSClass = transaction.value > 0 ? 'plus' : 'minus'
  li.classList.add(CSSClass)
  li.innerHTML = `
   ${name} <span> ${operator}R$ ${value}</span><button class="delete-btn">x</button>
  `
  UlTransactions.prepend(li)
}

const updateBalance = () => {
   const valuesTransactions = example_transactions
   .map(transaction => transaction.value)

   const total = valuesTransactions
   .reduce((accumulator,value)=> accumulator + value).toFixed(2)

   const expenses =Math.abs(valuesTransactions
   .filter(value => value < 0)
   .reduce((accumulator,value) => accumulator + value)).toFixed(2)

   const revenues = valuesTransactions
   .filter(value => value > 0)
   .reduce((accumulator,value) => accumulator + value).toFixed(2)

   balanceElement.textContent = `R$ ${total}`
   expensesElement.textContent = `R$ ${expenses}`
   revenuesElement.textContent = `R$ ${revenues}`
}

const init = () => {
  example_transactions.forEach(addTransactions)
  updateBalance()
}
init()