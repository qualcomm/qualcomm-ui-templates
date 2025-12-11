import {UserRegistration} from "../welcome/user-registration"

import type {Route} from "./+types/register"

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Register - Qualcomm App"},
    {content: "Create a new account", name: "description"},
  ]
}

export default function Register() {
  return <UserRegistration />
}