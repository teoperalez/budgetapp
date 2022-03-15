import { Container, Stack, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BudgetCard from './components/BudgetCard'
import React, { useState } from 'react'
import AddBudgetModal from './components/AddBudgetModal'
import AddExpenseModal from './components/AddExpenseModal'
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext'
import TotalBudgetCard from './components/TotalBudgetCard'
import ViewExpensesModal from './components/ViewExpensesModal'

export default function Home() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetID, setviewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetID] = useState()
  const {budgets, getBudgetExpenses} = useBudgets()

  function openAddExpenseModal (budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetID(budgetId)
  }

  return (
    <>
    <Container className='my-4'>
      <Stack direction="horizontal" gap="2" className = "mb-4">
        <h1 className='me-auto'>Budgets</h1>
        <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
      </Stack>
      <div style={{ display: 'grid', gridtemplatecolumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', alignItems: 'flex-start' }}>
        {budgets.map(budget => {
        const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
        return(
         <BudgetCard 
            key={budget.id} 
            name={budget.name} 
            amount={amount} 
            max = {budget.max} 
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            onViewExpenseClick ={() => setviewExpensesModalBudgetId(budget.id)}
          >
          </BudgetCard>
         
          
        )
        })}
        
      </div>
      <UncategorizedBudgetCard 
        onAddExpenseClick={openAddExpenseModal} 
        onViewExpenseClick ={() => setviewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
      />
      <TotalBudgetCard />
    </Container>
    <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}/>
    <AddExpenseModal 
      show = {showAddExpenseModal}
      defaultBudgetId={addExpenseModalBudgetId}
      handleClose={() => setShowAddExpenseModal(false)}/>
    <ViewExpensesModal 
      budgetId={viewExpensesModalBudgetID} 
      handleClose={() => setviewExpensesModalBudgetId()} 
    />
    </>

  )
}
