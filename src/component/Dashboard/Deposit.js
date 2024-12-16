import React, { useState} from "react";
import Sidebar from "./Sidebar";
import { GrStatusGood } from "react-icons/gr";

function Deposit() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
      // Sidebar toggle
      const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <>
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <section>
            <div><h1>Make Deposit</h1></div>

            <div>
                <div>
                    <h1>Starter Plan</h1>
                </div>
                <div>
                    <h3>Minimum Deposit: $50.00 - $1999</h3>
                </div>

                <div>
                    <h3>Profit: 6.00 (%)</h3>
                </div>

                <div>
                    <h3>Insurance <span><GrStatusGood /></span></h3>
                </div>
            </div>

            <div>
                <div>
                    <h1>CRYPTO PLAN</h1>
                </div>
                <div>
                    <h3>Minimum Deposit: $500.00 - $1999</h3>
                </div>

                <div>
                    <h3>Profit: 8 (%)</h3>
                </div>

                <div>
                    <h3>Insurance  <span><GrStatusGood /></span></h3>
                </div>
            </div>

            <div>
                <div>
                    <h1>ADVANCED PLAN</h1>
                </div>
                <div>
                    <h3>Minimum Deposit: $2000.00 - $3999</h3>
                </div>

                <div>
                    <h3>Profit: 15.00 (%)</h3>
                </div>

                <div>
                    <h3>Insurance <span><GrStatusGood /></span></h3>
                </div>
            </div>

            <div>
                <div>
                    <h1>PAY PLAN</h1>
                </div>
                <div>
                    <h3>Minimum Deposit: $1000.00 - $1999.00</h3>
                </div>

                <div>
                    <h3>Profit: 30.00 (%)</h3>
                </div>

                <div>
                    <h3>Insurance <span><GrStatusGood /></span></h3>
                </div>
            </div>

            <div>
                <div>
                    <h1>PREMIUM PLAN</h1>
                </div>
                <div>
                    <h3>Minimum Deposit: $5000.00 - Unlimited</h3>
                </div>

                <div>
                    <h3>Profit: 35.00 (%)</h3>
                </div>

                <div>
                    <h3>Insurance <span><GrStatusGood /></span></h3>
                </div>
            </div>
        </section>
    </>
  )
}

export default Deposit