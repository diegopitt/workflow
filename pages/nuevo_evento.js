import { useState, useEffect } from 'react'
import Layout from '../layout/Layout'

const nuevo_evento = (props) => (

<Layout {...props}>
  <div className="mt-10 sm:mt-0">
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Crea un evento</h3>
          <p className="mt-1 text-sm leading-5 text-gray-600">
            Completa los campos requeridos
          </p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-5 text-gray-700">Titulo del evento</label>
                  <input id="title" className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="type" className="block text-sm font-medium leading-5 text-gray-700">Tipo de evento</label>
                  <select id="type" className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                    <option>Yoga</option>
                    <option>Tai Chi</option>
                    <option>Stretching</option>
                    <option>Meditacion guiada</option>
                    <option>Respiracion</option>
                    <option>Nutricion</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="start" className="block text-sm font-medium leading-5 text-gray-700">Hora de inicio del evento</label>
                  <input id="start" className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="end" className="block text-sm font-medium leading-5 text-gray-700">Hora de finalizacion del evento</label>
                  <input id="end" className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                </div>
                <div className="col-span-6">
                  <label htmlFor="desc" className="block text-sm font-medium leading-5 text-gray-700">Descripcion</label>
                  <textarea id="desc" rows="3" className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="you@example.com"></textarea>
                </div>
                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label htmlFor="price" className="block text-sm font-medium leading-5 text-gray-700">Precio</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      $
                    </span>
                    <input id="price" className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  {/* <label htmlFor="state" className="block text-sm font-medium leading-5 text-gray-700">State / Province</label>
                  <input id="state" className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"/> */}
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  {/* <label htmlFor="postal_code" className="block text-sm font-medium leading-5 text-gray-700">ZIP / Postal</label>
                  <input id="postal_code" className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"/> */}
                </div>
              </div>
            </div>
            <div className="px-4 py-5 bg-white sm:p-6">
              <fieldset>
                <legend className="text-base leading-6 font-medium text-gray-900">Dias de la semana del evento</legend>
                <div className="mt-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="lunes" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                    </div>
                    <div className="ml-3 text-sm leading-5">
                      <label htmlFor="lunes" className="font-medium text-gray-700">Lunes</label>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="martes" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                      </div>
                      <div className="ml-3 text-sm leading-5">
                        <label htmlFor="martes" className="font-medium text-gray-700">Martes</label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="miercoles" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                      </div>
                      <div className="ml-3 text-sm leading-5">
                        <label htmlFor="miercoles" className="font-medium text-gray-700">Miercoles</label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="jueves" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                      </div>
                      <div className="ml-3 text-sm leading-5">
                        <label htmlFor="jueves" className="font-medium text-gray-700">Jueves</label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="viernes" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                      </div>
                      <div className="ml-3 text-sm leading-5">
                        <label htmlFor="viernes" className="font-medium text-gray-700">Viernes</label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="sabado" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                      </div>
                      <div className="ml-3 text-sm leading-5">
                        <label htmlFor="sabado" className="font-medium text-gray-700">Sabado</label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="domingo" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                      </div>
                      <div className="ml-3 text-sm leading-5">
                        <label htmlFor="domingo" className="font-medium text-gray-700">Domingo</label>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out">
                Publicar Evento
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</Layout>

)
export default nuevo_evento