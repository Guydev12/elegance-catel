import React from 'react'

const Overview = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {["Total Sales", "Orders", "Customers", "Products"].map((title, index) => (
              <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <h3 className="text-sm font-medium">{title}</h3>
                  <div className="mt-2 text-2xl font-bold">
                    {index === 0 && "$12,345"}
                    {index === 1 && "156"}
                    {index === 2 && "1,234"}
                    {index === 3 && "89"}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="size-10 rounded-full bg-muted" />
                      <div>
                        <p className="text-sm font-medium">Order #{1000 + index}</p>
                        <p className="text-xs text-muted-foreground">Customer {index + 1}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">${(Math.random() * 100 + 50).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  )
}

export default Overview
