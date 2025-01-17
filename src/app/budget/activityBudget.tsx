"use client";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from "react";
import { BiComment } from "react-icons/bi";
import { RiArrowDropDownLine } from 'react-icons/ri';
import { api } from '~/trpc/react';

interface ActivityBudgetProps {
  section: string;
  categoryId: number;
  budgetId: number;
  deptId: string;
}
interface totalschema {
  totalQ1: number
  totalQ2: number
  totalQ3: number
  totalQ4: number
}
interface subProgramActivitesSchema{
  map:number
  name:string
}
interface LevelData {
  budgetDetailsId: number
  Count: string | number;
  [month: string]: string | number;
}

type TableData = Record<string, LevelData>;

const subProgramActivites:subProgramActivitesSchema[] = [
  {map:1,name:"Certificate Event"},
  {map:2,name:"Faculty Workshop"},
  {map:3,name:"Alumni Engagement"},
  {map:4, name: "AI and Placement Drive"},
  {map:5, name: "ITI Diagnostic"},
  {map:6, name: "Divisional workshop"},
  {map:7, name: "Divisional Industry workshop"},
  {map:8, name: "MSDF Event"},
  {map:9, name: "DSE Shoshin"},
  {map:10, name: "Poly-Enrollment Drive"},
  {map:11,name:"Poly-Placement12rive"},
  {map:12, name: "Industry Engagement"},
  {map:13,name:"TCPO Workshop"},
  {map:14,name:"DSE Faculty workshop"},
  {map:0,name:"All"}
]


const months = [
  "Qty1",
  "Rate1",
  "Amount1",
  "Apr",
  "May",
  "Jun",
  "Qty2",
  "Rate2",
  "Amount2",
  "Jul",
  "Aug",
  "Sep",
  "Qty3",
  "Rate3",
  "Amount3",
  "Oct",
  "Nov",
  "Dec",
  "Qty4",
  "Rate4",
  "Amount4",
  "Jan",
  "Feb",
  "Mar",
];

const ActivityBudget: React.FC<ActivityBudgetProps> = ({ section, categoryId, budgetId, deptId }) => {

  const userData = useSession()
  const { data, refetch } = api.get.getSubCats.useQuery({ categoryId});
  const [totalQty, setTotalQty] = useState<totalschema>({
    totalQ1: 0, totalQ2: 0, totalQ3: 0, totalQ4: 0
  })
  const [tableData, setTableData] = useState<TableData>({});
  const [filter, setFilter] = useState(subProgramActivites.sort((a, b) => a.name.localeCompare(b.name))[0])
  const handleSelect = (val: subProgramActivitesSchema) => {
    setFilter(val)
  }
  const updateTotalQtyVals = (which: string, difference: number) => {
    setTotalQty((prev) => {
      const updatedTotal = { ...prev };
      console.log(difference)
      updatedTotal[which as keyof typeof prev] += difference;
      return updatedTotal;
    });
  };
  const isSaveDisabled = () => {
    return Object.values(tableData).some((subData) => {
      return months.some((month) => {
        return !subData[month]?.toString().trim(); 
      });
    });
  };
  const { data: categoriesBudgetDetails, isLoading, error } = api.get.getCatsBudgetDetails.useQuery({
    budgetId,
    catId: categoryId,
    deptId: Number(deptId),
    activity:(filter?.map)?.toString()
  },{
    enabled:!!filter
  });
  useEffect(() => {
    const initialData: TableData = {};
    if (data?.subCategories) {
      data.subCategories.forEach((sub) => {
        initialData[sub.subCategoryId] = {
          Count:"",
          Qty1:0,
          Rate1:"0",
          Amount1:"0",
          Apr:"0",
          May:"0",
          Jun:"0",
          Qty2:0,
          Rate2:"0",
          Amount2:"0",
          Jul:"0",
          Aug:"0",
          Sep:"0",
          Qty3:0,
          Rate3:"0",
          Amount3:"0",
          Oct:"0",
          Nov:"0",
          Dec:"0",
          Qty4:"0",
          Rate4:"0",
          Amount4:"0",
          Jan:"0",
          Feb:"0",
          Mar:"0",
          budgetDetailsId:0
        };
      });
    }
    if (categoriesBudgetDetails) {
      const totalQtyAfterBudgetDetails: totalschema = { totalQ1: 0, totalQ2: 0, totalQ3: 0, totalQ4: 0 }
      categoriesBudgetDetails.forEach((item) => {
        initialData[item.subcategoryId] = {
          Count: item.total? Number(item.total) : 0,
          Apr: item.april ? Number(item.april) : "0",
          May: item.may ? Number(item.may) : "0",
          Jun: item.june ? Number(item.june) : "0",
          Jul: item.july ? Number(item.july) : "0",
          Aug: item.august ? Number(item.august) : "0",
          Sep: item.september ? Number(item.september) : "0",
          Oct: item.october ? Number(item.october) : "0",
          Nov: item.november ? Number(item.november) : "0",
          Dec: item.december ? Number(item.december) : "0",
          Jan: item.january ? Number(item.january) : "0",
          Feb: item.february ? Number(item.february) : "0",
          Mar: item.march ? Number(item.march) : "0",
          Qty1: item.qty1 ? Number(Number(item.qty1)) : "0",
          Rate1: item.rate1 ? Number(item.rate1) : "0",
          Amount1: item.amount1 ? Number(item.amount1) : "0",
          Qty2: item.qty2 ? Number(item.qty2) : "0",
          Rate2: item.rate2 ? Number(item.rate2) : "0",
          Amount2: item.amount2 ? Number(item.amount2) : "0",
          Qty3: item.qty3 ? Number(Number(item.qty3)) : "0",
          Rate3: item.rate3 ? Number(item.rate3) : "0",
          Amount3: item.amount3 ? Number(item.amount3) : "0",
          Qty4: item.qty4 ? Number( Number(item.qty4)) : "0",
          Rate4: item.rate4 ? Number(item.rate4) : "0",
          Amount4: item.amount4 ? Number(item.amount4) : "0",
          budgetDetailsId: item.id ? Number(Number(item.id)) :0 
        };
        totalQtyAfterBudgetDetails.totalQ1 += Number(item.april) + Number(item.may) + Number(item.june)
        totalQtyAfterBudgetDetails.totalQ2 += Number(item.july) + Number(item.august) + Number(item.september)
        totalQtyAfterBudgetDetails.totalQ3 += Number(item.october) + Number(item.november) + Number(item.december)
        totalQtyAfterBudgetDetails.totalQ4 += Number(item.january) + Number(item.february) + Number(item.march)
      });
      setTableData(initialData);
      setTotalQty(totalQtyAfterBudgetDetails)
    }
    else {
      setTableData({});
    }
  }, [categoriesBudgetDetails]);
 
  const handleInputChange = (
    subCategoryId: number,
    month: string,
    value: string
  ) => {
    setTableData((prev) => {
      const updatedData = { ...prev };
      const subCategoryData = updatedData[subCategoryId];
      if (!subCategoryData) return prev;

      if (month == "Apr" || month == "May" || month == "Jun") {
        const diff = Number(value) - Number(subCategoryData[month]);
        updateTotalQtyVals("totalQ1", diff)
      }
      if (month == "Jul" || month == "Aug" || month == "Sep") {
        const diff = Number(value) - Number(subCategoryData[month]);
        updateTotalQtyVals("totalQ2", diff)
      }
      if (month == "Oct" || month == "Nov" || month == "Dec") {
        const diff = Number(value) - Number(subCategoryData[month]);
        updateTotalQtyVals("totalQ3", diff)
      }
      if (month == "Jan" || month == "Feb" || month == "Mar") {
        const diff = Number(value) - Number(subCategoryData[month]);
        updateTotalQtyVals("totalQ4", diff)
      }

      // Calculate Amount Updates
      if (month === "Rate1") {
        subCategoryData.Amount1 = (Number(subCategoryData.Qty1) * Number(value)).toFixed(2)  
      }
      else if (month === "Qty1"){
        subCategoryData.Amount1 = (Number(subCategoryData.Rate1) * Number(value)).toFixed(2)
      } 
      else if (month === "Rate2") {
        subCategoryData.Amount1 = (Number(subCategoryData.Qty2) * Number(value)).toFixed(2)
      }
      else if (month === "Qty2") {
        subCategoryData.Amount1 = (Number(subCategoryData.Rate2) * Number(value)).toFixed(2)
      } else if (month === "Rate3") {
        subCategoryData.Amount1 = (Number(subCategoryData.Qty3) * Number(value)).toFixed(2)
      }
      else if (month === "Qty3") {
        subCategoryData.Amount1 = (Number(subCategoryData.Rate3) * Number(value)).toFixed(2)
      } else if (month === "Rate4") {
        subCategoryData.Amount1 = (Number(subCategoryData.Qty4) * Number(value)).toFixed(2)
      }
      else if (month === "Qt4") {
        subCategoryData.Amount1 = (Number(subCategoryData.Rate4) * Number(value)).toFixed(2)
      } 

      subCategoryData[month] = value;
      updatedData[subCategoryId] = subCategoryData;

      return updatedData;
    });
  };


  const createBudgetDetails = api.post.addBudgetDetails.useMutation();
  const handleSave = async () => {
    const budgetDetails = Object.entries(tableData).map(([subCategoryId, data]) => ({
      budgetid: budgetId, 
      catid: categoryId,
      subcategoryId: parseInt(subCategoryId, 10),
      // need to be removed
      unit: 1, 
      rate: "1", 
      total: "1", 
      currency: "USD", 
      notes: "",
      description: "",
      april: (data.Apr ?? "").toString(),
      may: (data.May ?? "").toString(),
      june: (data.Jun ?? "").toString(),
      july: (data.Jul ?? "").toString(),
      august: (data.Aug ?? "").toString(),
      september: (data.Sep ?? "").toString(),
      october: (data.Oct ?? "").toString(),
      november: (data.Nov ?? "").toString(),
      december: (data.Dec ?? "").toString(),
      january: (data.Jan ?? "").toString(),
      february: (data.Feb ?? "").toString(),
      march: (data.Mar ?? "").toString(),
      activity: (filter?.map??"").toString(),
      deptId: Number(deptId),
      clusterId: undefined,
      createdBy: userData.data?.user.id ?? 1,
      createdAt: new Date().toISOString(),
      rate1:(data.rate1 ?? "").toString(),
      rate2: (data.rate2 ?? "").toString(),
      rate3: (data.rate3 ?? "").toString(),
      rate4: (data.rate4 ?? "").toString(),
      amount1: ((data.amount1 ?? "").toString()),
      amount2: ((data.amount2 ?? "").toString()),
      amount3: ((data.amount3 ?? "").toString()),
      amount4: ((data.amount4 ?? "").toString()),
      qty1: Number(data.Qty1),
      qty2: Number(data.Qty2),
      qty3: Number(data.Qty3),
      qty4: Number(data.Qty4)
    }));

    try {
      createBudgetDetails.mutate(
        {
          deptId: Number(deptId),
          budgetId: budgetId,
          catId: categoryId,
          data: budgetDetails,
        },
        {
          onSuccess: (data) => {
            console.log("Budget created successfully:", data);
          },
          onError: (error) => {
            console.error("Error creating budget:", error);
          },
        }
      );
    } catch (error) {
      console.error("Failed to save budget details:", error);
      alert("Failed to save budget details. Please try again.");
    }
  };
  const updateBudgetDetails = api.post.updateBudgetDetails.useMutation();
  const handleUpdate = async () => {
    const budgetDetails = Object.entries(tableData).map(([subCategoryId, data]) => ({
      budgetDetailsId: data.budgetDetailsId,
      catid: categoryId,
      subcategoryId: parseInt(subCategoryId, 10),
      // need to be removed
      unit: 1,
      rate: "1",
      total: "1",
      currency: "USD",
      notes: "",
      description: "",
      april: (data.Apr ?? "").toString(),
      may: (data.May ?? "").toString(),
      june: (data.Jun ?? "").toString(),
      july: (data.Jul ?? "").toString(),
      august: (data.Aug ?? "").toString(),
      september: (data.Sep ?? "").toString(),
      october: (data.Oct ?? "").toString(),
      november: (data.Nov ?? "").toString(),
      december: (data.Dec ?? "").toString(),
      january: (data.Jan ?? "").toString(),
      february: (data.Feb ?? "").toString(),
      march: (data.Mar ?? "").toString(),
      activity: (filter?.map ?? "").toString(),
      clusterId: undefined,
      updatedBy: userData.data?.user.id??1,
      updatedAt: new Date().toISOString(),
      rate1: (data.rate1 ?? "").toString(),
      rate2: (data.rate2 ?? "").toString(),
      rate3: (data.rate3 ?? "").toString(),
      rate4: (data.rate4 ?? "").toString(),
      amount1: ((data.amount1 ?? "").toString()),
      amount2: ((data.amount2 ?? "").toString()),
      amount3: ((data.amount3 ?? "").toString()),
      amount4: ((data.amount4 ?? "").toString()),
      qty1: Number(data.Qty1),
      qty2: Number(data.Qty2),
      qty3: Number(data.Qty3),
      qty4: Number(data.Qty4)
    }));
    try {
      updateBudgetDetails.mutate(
        {
          deptId: parseInt(deptId, 10),
          budgetId,
          catId: categoryId,
          data: budgetDetails,
        },
        {
          onSuccess: (data) => {
            console.log("Budget updated successfully:", data);
          },
          onError: (error) => {
            console.error("Error updating budget:", error);
          },
        }
      );
    } catch (error) {
      console.error("Failed to update budget details:", error);
      alert("Failed to update budget details. Please try again.");
    }
  };
  return (
    <div className="my-6 rounded-md bg-white shadow-lg">
      <details
        className={`group mx-auto w-full overflow-hidden rounded bg-[#F5F5F5] shadow transition-[max-height] duration-500`}
      >
        <summary className="flex cursor-pointer items-center justify-between rounded-md border border-primary bg-primary/10 p-2 text-primary outline-none">
          <h1 className=" uppercase ">{section}</h1>
          <div className="flex items-center space-x-2">
            <p className="text-sm">Total Cost: Q1:{totalQty.totalQ1} Q2:{totalQty.totalQ2} Q3:{totalQty.totalQ3} Q4:{totalQty.totalQ4}</p>
            <span className="text-lg font-bold transition-transform group-open:rotate-90">
              →
            </span>
          </div>
        </summary>

        <div className='w-72 mt-3 z-10'>
          <DropdownMenu.Root >
            <DropdownMenu.Trigger asChild>
              <button className="cursor-pointer  py-1 border rounded-lg text-left text-gray-500 text-sm pl-2 font-normal flex justify-between items-center w-full">
                <span>{filter?.name} </span>
                <RiArrowDropDownLine size={30} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              className="bg-white max-h-56 overflow-y-scroll shadow-lg rounded-lg p-2 !w-[280px]"
            >
              {subProgramActivites.sort((a, b) => a.name.localeCompare(b.name)).map((val, ind) => (
                <DropdownMenu.Item
                  key={ind}
                  className="p-2 focus:ring-0 hover:bg-gray-100 rounded cursor-pointer text-sm"
                  onSelect={() => handleSelect(val)} 
                >
                  {val.name}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>

        </div>
        <hr className="my-2 scale-x-150" />
        <div className="bg-gray-50 overflow-scroll">
          {/* Table */}
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm uppercase text-gray-600">
                <th className="border p-2">Particulars</th>
                <th scope="col" className="border p-2">
                  Qty
                </th>
                <th scope="col" className="border p-2">
                  Rate
                </th>
                <th scope="col" className="border p-2">
                  Amount
                </th>
                <th scope="col" className="border p-2">
                  Apr
                </th>
                <th scope="col" className="border p-2">
                  May
                </th>
                <th scope="col" className="border p-2">
                  Jun
                </th>

                <th scope="col" className="border p-2">
                  Qty
                </th>
                <th scope="col" className="border p-2">
                  Rate
                </th>
                <th scope="col" className="border p-2">
                  Amount
                </th>
                <th scope="col" className="border p-2">
                  Jul
                </th>
                <th scope="col" className="border p-2">
                  Aug
                </th>
                <th scope="col" className="border p-2">
                  Sep
                </th>

                <th scope="col" className="border p-2">
                  Qty
                </th>
                <th scope="col" className="border p-2">
                  Rate
                </th>
                <th scope="col" className="border p-2">
                  Amount
                </th>
                <th scope="col" className="border p-2">
                  Oct
                </th>
                <th scope="col" className="border p-2">
                  Nov
                </th>
                <th scope="col" className="border p-2">
                  Dec
                </th>
                <th scope="col" className="border p-2">
                  Qty
                </th>
                <th scope="col" className="border p-2">
                  Rate
                </th>
                <th scope="col" className="border p-2">
                  Amount
                </th>
                <th scope="col" className="border p-2">
                  Jan
                </th>
                <th scope="col" className="border p-2">
                  Feb
                </th>
                <th scope="col" className="border p-2">
                  Mar
                </th>
                <th scope="col" className="border p-2">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.subCategories.map((sub,key) => (
                <tr
                  key={sub.subCategoryId}
                  className="text-sm transition hover:bg-gray-100"
                >

                  <td className="border p-2 font-medium">{sub.subCategoryName}</td>
                  {months.map((month,key) => (
                    <td key={month} className="border p-2">
                      <input
                        disabled={key == 2 || key ==8 || key== 14 || key==20 || filter?.map==0}
                        type={key%6 == 0 ?"number":"text"}
                        className="w-full rounded border p-1"
                        value={tableData[sub.subCategoryId]?.[month] ?? ""}
                        onChange={(e) =>
                          handleInputChange(
                            sub.subCategoryId,
                            month,
                            e.target.value,
                          )
                        }
                      />
                    </td>
                  ))}
                  <td className="border p-2">
                    <BiComment className="text-xl" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {
          filter?.map != 0 && <div className="py-2 pr-4 flex flex-row-reverse ">
            {
              categoriesBudgetDetails && categoriesBudgetDetails.length > 0 ? <Button
                type="button"
                className="cursor-pointer !text-white !bg-primary px-2 !w-20 !text-lg border border-black !disabled:cursor-not-allowed"
                variant="soft"
                style={{ cursor: isSaveDisabled() ? "not-allowed" : "pointer" }}
                disabled={isSaveDisabled()}
                onClick={() => handleUpdate()}
              >
                Edit
              </Button> : <Button
                type="button"
                className="cursor-pointer !text-white !bg-primary px-2 !w-20 !text-lg border border-black !disabled:cursor-not-allowed"
                variant="soft"
                style={{ cursor: isSaveDisabled() ? "not-allowed" : "pointer" }}
                disabled={isSaveDisabled()}
                onClick={() => handleSave()}
              >
                Save
              </Button>
            }
          </div>
        }
        
        
      </details>

    </div>
  );
};

export default ActivityBudget;
