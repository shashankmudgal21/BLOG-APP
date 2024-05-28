import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
export default function FooterComp() {
  return (
    <Footer container className='border-t-8 border-teal-500'>
      <div className='mx-auto w-full'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-3'>
          <Link to = '/' className='font-bold  dark:text-white text-lg sm:text-xl'>
            <span className='self-center whitespace-nowrap text-white px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg'>Shashank's</span>
            Blog
           </Link>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 mt-4'>
            <div>
            <Footer.Title title="about" />
              <Footer.LinkGroup col>
                    <Footer.Link href="#" target='__blank'>Flowbite</Footer.Link>
                    <Footer.Link href="#"  target='__blank'>Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title="follow us" />
              <Footer.LinkGroup col>
                    <Footer.Link href="#" target='__blank'>Github</Footer.Link>
                    <Footer.Link href="#"  target='__blank'>Linked In</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                    <Footer.Link href="#" target='__blank'>Privacy policy</Footer.Link>
                    <Footer.Link href="#"  target='__blank'>Terms &amp; conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Shashank" year={new Date().getFullYear()} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  )
}
