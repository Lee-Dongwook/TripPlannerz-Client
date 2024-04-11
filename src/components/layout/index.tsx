const Layout = ({ children }) => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Header</h1>
        </div>
      </header>
      <div className='py-10'>
        <div className='bg-white shadow overflow-hidden sm:rounded-lg grid grid-cols-1 md:grid-cols-4'>
          <aside className='col-span-1 bg-gray-50 p-5 border-r'>
            <h3 className='font-bold text-xl mb-5'>SideBar</h3>
            <ul className='space-y-4'>
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
            </ul>
          </aside>
          <main className='col-span-3 p-5'>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
