"use client"
import { Tab } from '@headlessui/react'
import AddSaldo from './addSaldo'
import AddAdmin from './addAdmin'
import ConfigAdmin from './configGateway'
import TotalDeposits from './totalDeposits'
import DepositsToday from './depositsToday'
import DepositsPeding from './depositsPending'
import SaldoApi from './saldoApi'
import ConfigFivescan from './fivescanModify'
import AddInfluencer from './addInfluencer'
import ConfigFiverVision from './fiverVisionModify'
import TableElegant from './tableSaque'
import UpdateSaque from './saqueMinimo'
function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }

export default function AdminTab(){
    return(
        <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >Adicionar Saldo</Tab>
            <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Adicionar Admin</Tab>
            <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Configuração de Pagamento</Tab>


              <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Todos depósitos</Tab>
              <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Depósitos hoje</Tab>
              <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Depósitos pendentes</Tab>
              <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Saldo API</Tab>
              <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Configuração Fivescan</Tab>
              <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Configuração FiverVision</Tab>
              <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Adicionar Influencer</Tab>
              <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Saques</Tab>
              <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Saque mínimo</Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel><AddSaldo /></Tab.Panel>
                <Tab.Panel><AddAdmin /></Tab.Panel>
                <Tab.Panel><ConfigAdmin /></Tab.Panel>
                <Tab.Panel><TotalDeposits /></Tab.Panel>
                <Tab.Panel><DepositsToday /></Tab.Panel>
                <Tab.Panel><DepositsPeding /></Tab.Panel>
                <Tab.Panel><SaldoApi /></Tab.Panel>
                <Tab.Panel><ConfigFivescan /></Tab.Panel>
                <Tab.Panel><ConfigFiverVision /></Tab.Panel>
                <Tab.Panel><AddInfluencer /></Tab.Panel>
                <Tab.Panel><TableElegant /></Tab.Panel>
                <Tab.Panel><UpdateSaque /></Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    )
}