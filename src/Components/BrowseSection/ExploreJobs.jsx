import React from "react";
import { NavLink } from "react-router";

const ExploreJobs = () => {
  const linkClass =
    "block text-sm text-gray-600 hover:text-[#22A7F0] transition";
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
      <div>
        <h3 className="font-semibold mb-4">Jobs</h3>
        <ul className="space-y-2">
          <li>
            <NavLink to="/jobs/part-time" className={linkClass}>
              Part Time
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/hiring-immediately" className={linkClass}>
              Hiring Immediately
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/full-time" className={linkClass}>
              Full Time
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/remote-work" className={linkClass}>
              Remote Work From Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/remote" className={linkClass}>
              Remote
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/warehouse-worker" className={linkClass}>
              Warehouse Worker
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/work-from-home" className={linkClass}>
              Work From Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/retail-sales-associate" className={linkClass}>
              Retail Sales Associate
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/server" className={linkClass}>
              Server
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/entry-level" className={linkClass}>
              Entry Level
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/receptionist" className={linkClass}>
              Receptionist
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/urgently-hiring" className={linkClass}>
              Urgently Hiring
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/walmart" className={linkClass}>
              Walmart
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/registered-nurse" className={linkClass}>
              Registered Nurse
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/night-shift" className={linkClass}>
              Night Shift
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/amazon" className={linkClass}>
              Amazon
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/administrative-assistant" className={linkClass}>
              Administrative Assistant
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/data-entry-clerk" className={linkClass}>
              Data Entry Clerk
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/seasonal" className={linkClass}>
              Seasonal
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs/restaurant" className={linkClass}>
              Restaurant
            </NavLink>
          </li>
          <li className="font-medium">
            <NavLink to="/jobs" className={linkClass}>
              Browse All Jobs
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Cities */}
      <div>
        <h3 className="font-semibold mb-4">Cities</h3>
        <ul className="space-y-2">
          <li>
            <NavLink to="/cities/remote" className={linkClass}>
              Remote
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/new-york-ny" className={linkClass}>
              New York, NY
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/united-states" className={linkClass}>
              United States
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/houston-tx" className={linkClass}>
              Houston, TX
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/chicago-il" className={linkClass}>
              Chicago, IL
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/los-angeles-ca" className={linkClass}>
              Los Angeles, CA
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/atlanta-ga" className={linkClass}>
              Atlanta, GA
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/las-vegas-nv" className={linkClass}>
              Las Vegas, NV
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/philadelphia-pa" className={linkClass}>
              Philadelphia, PA
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/dallas-tx" className={linkClass}>
              Dallas, TX
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/san-antonio-tx" className={linkClass}>
              San Antonio, TX
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/phoenix-az" className={linkClass}>
              Phoenix, AZ
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/california" className={linkClass}>
              California
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/orlando-fl" className={linkClass}>
              Orlando, FL
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/charlotte-nc" className={linkClass}>
              Charlotte, NC
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/texas" className={linkClass}>
              Texas
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/florida" className={linkClass}>
              Florida
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/washington-dc" className={linkClass}>
              Washington, DC
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/san-diego-ca" className={linkClass}>
              San Diego, CA
            </NavLink>
          </li>
          <li>
            <NavLink to="/cities/denver-co" className={linkClass}>
              Denver, CO
            </NavLink>
          </li>
          <li className="font-medium">
            <NavLink to="/cities" className={linkClass}>
              Browse All Cities
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Companies */}
      <div>
        <h3 className="font-semibold mb-4">Companies</h3>
        <ul className="space-y-2">
          <li>
            <NavLink to="/companies/dollar-general" className={linkClass}>
              Dollar General
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/mcdonalds" className={linkClass}>
              McDonald's
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/walmart" className={linkClass}>
              Walmart
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/accenture" className={linkClass}>
              Accenture
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/hireitpeople" className={linkClass}>
              hireITpeople
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/wendys" className={linkClass}>
              Wendy's
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/dominos" className={linkClass}>
              Domino's
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/cvs-health" className={linkClass}>
              CVS Health
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/companies/first-class-real-estate"
              className={linkClass}
            >
              1st Class Real Estate KC
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/taco-bell" className={linkClass}>
              Taco Bell
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/circle-k" className={linkClass}>
              Circle K
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/hr-block" className={linkClass}>
              H&R Block
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/starbucks" className={linkClass}>
              Starbucks
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/doordash" className={linkClass}>
              DoorDash
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/burger-king" className={linkClass}>
              Burger King
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/autozone" className={linkClass}>
              AutoZone
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/amn-healthcare" className={linkClass}>
              AMN Healthcare
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/dunkin" className={linkClass}>
              Dunkin'
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/home-depot" className={linkClass}>
              The Home Depot
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies/costco" className={linkClass}>
              Costco Wholesale
            </NavLink>
          </li>
          <li className="font-medium">
            <NavLink to="/companies" className={linkClass}>
              Browse All Companies
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Salaries */}
      <div>
        <h3 className="font-semibold mb-4">Salaries</h3>
        <ul className="space-y-2">
          <li>
            <NavLink to="/salaries/delivery-driver" className={linkClass}>
              Delivery Driver
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/truck-driver" className={linkClass}>
              Truck Driver
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/registered-nurse" className={linkClass}>
              Registered Nurse
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/salaries/customer-service-representative"
              className={linkClass}
            >
              Customer Service Representative
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/cashier" className={linkClass}>
              Cashier
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/salaries/retail-sales-associate"
              className={linkClass}
            >
              Retail Sales Associate
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/crew-member" className={linkClass}>
              Crew Member
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/warehouse-worker" className={linkClass}>
              Warehouse Worker
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/sales-associate" className={linkClass}>
              Sales Associate
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/server" className={linkClass}>
              Server
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/store-manager" className={linkClass}>
              Store Manager
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/sales-representative" className={linkClass}>
              Sales Representative
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/general-manager" className={linkClass}>
              General Manager
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/driver" className={linkClass}>
              Driver
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/team-member" className={linkClass}>
              Team Member
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/manager" className={linkClass}>
              Manager
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/stocker" className={linkClass}>
              Stocker
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/assistant-manager" className={linkClass}>
              Assistant Manager
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/director" className={linkClass}>
              Director
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries/warehouse-associate" className={linkClass}>
              Warehouse Associate
            </NavLink>
          </li>
          <li className="font-medium">
            <NavLink to="/salaries" className={linkClass}>
              Browse All Salaries
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExploreJobs;
