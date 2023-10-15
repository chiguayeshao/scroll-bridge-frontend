import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import Image from "next/image"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useBalance } from "wagmi"

const BridgeCard = () => {
  const [inputValueDeposit, setInputValueDeposit] = useState("")
  const [selectedNetworkDeposit, setSelectedNetworkDeposit] =
    useState("ZkSync")
  const [selectedTokenDeposit, setSelectedTokenDeposit] = useState("ETH")

  const { address, isDisconnected } = useAccount()
  
  const { data, isError, isLoading } = useBalance({
    address: address,
    chainId: 280,
    watch: true,
    cacheTime: 2_000
  })

  const handleDepositConfirmClick = () => {
    console.log("Current Tab: Deposit")
    console.log("Input Value (Deposit):", inputValueDeposit)
    console.log("Selected Network (Deposit):", selectedNetworkDeposit)
    console.log("Selected Token (Deposit):", selectedTokenDeposit)
  }

  const formatNumber = (numStr) => {
    const parsed = parseFloat(numStr)
    if (!isNaN(parsed)) {
      return parsed.toFixed(3)
    }
    return "Invalid number"
  }

  return (
    <div className="w-2/3 bg-white p-8 rounded-3xl shadow-md">
      <div className=" font-bold text-3xl">Bridge</div>
      <div className="flex justify-center pt-6">
        <Tabs defaultValue="deposit" className="w-full">
          {/* deposit */}
          <TabsContent value="deposit">
            <Card>
              <CardHeader>
                <CardTitle>From</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Select
                    onValueChange={(value) => setSelectedNetworkDeposit(value)}
                    defaultValue="ZkSync"
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select NetWork" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Network</SelectLabel>
                        <SelectItem value="ZkSync">ZkSync</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-row items-center justify-center gap-4">
                  <Input
                    id="token"
                    placeholder="0.00"
                    value={inputValueDeposit}
                    onChange={(e) => {
                      const value = e.target.value
                      const regex = /^\d+(\.\d{0,2})?$/
                      if (regex.test(value) || value === "") {
                        setInputValueDeposit(value)
                      }
                    }}
                  />
                  <div>
                    <Select
                      onValueChange={(value) => setSelectedTokenDeposit(value)}
                      defaultValue="ETH"
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Token" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Token</SelectLabel>
                          <SelectItem value="ETH">ETH</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="bg-[#f4be76] hover:bg-[#eeae5a]"
                  >
                    max
                  </Button>
                </div>
                <div className="flex flex-row justify-between mt-4">
                  <div></div>
                  {data ? (
                    <div className="flex flex-row font-bold gap-2">
                      Balance:
                      <div className="text-[#ed7255]">
                        {formatNumber(data?.formatted)}
                      </div>
                      In {selectedNetworkDeposit}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </CardContent>
              <CardHeader>
                <CardTitle>To</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row justify-between space-y-2">
                <div className="space-y-1">
                  <Image
                    src="/scrollLogo.svg"
                    alt="scrollLogo"
                    width={128}
                    height={96}
                  />
                </div>
                <div className="flex flex-row gap-2">
                  Estiamted return on Scroll <div className="text-[#ed7255]">{1.22}</div> ETH
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-center">
                {isDisconnected ? (
                  <ConnectButton />
                ) : (
                  <Button
                    className="w-1/2 bg-[#f4be76] hover:bg-[#eeae5a]"
                    onClick={handleDepositConfirmClick}
                  >
                    Confirm
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default BridgeCard
