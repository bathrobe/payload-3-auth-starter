import AuthCardWrapper from '../AuthCardWrapper'
import CreateUserForm from './CreateUserForm'
export default function CreateUser() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AuthCardWrapper
        title="Create User"
        description="Create a new user account"
        footerLinks={<div></div>}
      >
        <CreateUserForm />
      </AuthCardWrapper>
    </div>
  )
}
