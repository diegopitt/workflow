import { useState, useEffect } from 'react'
import Layout from '../layout/Layout'

const Profile = (props) => (

<Layout {...props}>
  <div >
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-2 py-3  sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Yoga</h3>
          <p className="mt-1 text-sm leading-5 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div className="sm:overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div>
                <label htmlFor="about" className="block text-sm leading-5 font-medium text-gray-700">
                  About
                </label>
                <div className="mt-2 text-sm">
                  <span className="inline-block h-12 w-12 overflow-hidden bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Brief description htmlFor your profile. URLs are hyperlinked.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</Layout>

)
export default Profile