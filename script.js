const example_transactions = [
  {id: 1, name:'salário', value: 1200},
  {id: 2, name:'investimentos', value: 1000},
  {id: 3, name:'aluguel', value: -500},
  {id: 4, name:'viagem', value: -1200}
]

const addTransactions = transaction => {
  const operator = transaction.value > 0 ? '+' : '-'
  console.log(operator)
}

addTransactions(example_transactions[0])