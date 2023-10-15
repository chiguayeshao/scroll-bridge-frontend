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

const LiquidityCard = () => {
  const [inputValueDeposit, setInputValueDeposit] = useState("")
  const [selectedNetworkDeposit, setSelectedNetworkDeposit] = useState("Zksync")
  const [selectedTokenDeposit, setSelectedTokenDeposit] = useState("ETH")

  const [inputValueWithdraw, setInputValueWithdraw] = useState("")
  const [selectedNetworkWithdraw, setSelectedNetworkWithdraw] =
    useState("Zksync")
  const [selectedTokenWithdraw, setSelectedTokenWithdraw] = useState("ETH")

  const handleDepositConfirmClick = () => {
    console.log("Current Tab: Deposit")
    console.log("Input Value (Deposit):", inputValueDeposit)
    console.log("Selected Network (Deposit):", selectedNetworkDeposit)
    console.log("Selected Token (Deposit):", selectedTokenDeposit)
  }

  const handleWithdrawConfirmClick = () => {
    console.log("Current Tab: Withdraw")
    console.log("Input Value (Withdraw):", inputValueWithdraw)
    console.log("Selected Network (Withdraw):", selectedNetworkWithdraw)
    console.log("Selected Token (Withdraw):", selectedTokenWithdraw)
  }

  const { address, isDisconnected } = useAccount()
  const { data, isError, isLoading } = useBalance({
    address: address,
    chainId: 534351,
    watch: true,
    cacheTime: 2_000
  })

  if (isLoading) return <div>Fetching balance…</div>
  if (isError) return <div>Error fetching balance</div>

  function formatNumber(numStr) {
    const parsed = parseFloat(numStr)
    if (!isNaN(parsed)) {
      return parsed.toFixed(3)
    }
    return "Invalid number"
  }

  return (
    <div className="w-2/3 bg-white p-8 rounded-3xl shadow-md">
      <div className="font-bold text-3xl">Add liquidity</div>
      <div className="flex justify-center pt-6">
        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#fcefdc]">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>

          {/* deposit */}
          <TabsContent value="deposit">
            <Card>
              <CardHeader>
                <div className="flex flex-row justify-between">
                  <CardTitle>Select Pool</CardTitle>
                  <div className="font-bold text-xl">
                    <div className="flex flex-row gap-2">
                      Total <div className="text-[#ed7255]">{3}</div>ETH In{" "}
                      <div>{selectedNetworkDeposit}</div> Pool
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Select
                    onValueChange={(value) => setSelectedNetworkDeposit(value)}
                    defaultValue="Zksync"
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select NetWork" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Network</SelectLabel>
                        <SelectItem value="Zksync">Zksync</SelectItem>
                        <SelectItem value="Scroll">Scroll</SelectItem>
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
                  <Button className="bg-[#f4be76] hover:bg-[#eeae5a]">
                    max
                  </Button>
                </div>
                <div className="flex flex-row justify-between mt-4">
                  <div></div>
                  {data ? (
                    <div className="flex flex-row font-bold gap-2">
                      Balance:{" "}
                      <div className="text-[#ed7255]">
                        {formatNumber(data?.formatted)}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
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
                    Deposit
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          {/* withdraw */}
          <TabsContent value="withdraw">
            <Card>
              <CardHeader>
                <CardTitle>Select Pool</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Select
                    onValueChange={(value) => setSelectedNetworkWithdraw(value)}
                    defaultValue="Zksync"
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select NetWork" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Network</SelectLabel>
                        <SelectItem value="Zksync">Zksync</SelectItem>
                        <SelectItem value="Scroll">Scroll</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-row items-center justify-center gap-4">
                  <Input
                    id="token"
                    placeholder="0.00"
                    value={inputValueWithdraw}
                    onChange={(e) => {
                      const value = e.target.value
                      const regex = /^\d+(\.\d{0,2})?$/
                      if (regex.test(value) || value === "") {
                        setInputValueWithdraw(value)
                      }
                    }}
                  />
                  <div>
                    <Select
                      onValueChange={(value) => setSelectedTokenWithdraw(value)}
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
                  <Button className="bg-[#f4be76] hover:bg-[#eeae5a]">
                    max
                  </Button>
                </div>
                <div className="flex flex-row justify-between mt-4">
                  <div></div>
                  <div className="flex flex-row font-bold gap-2">
                    Balance: <div className="text-[#ed7255]">{2}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-center">
                {isDisconnected ? (
                  <ConnectButton />
                ) : (
                  <Button
                    className="w-1/2 bg-[#f4be76] hover:bg-[#eeae5a]"
                    onClick={handleWithdrawConfirmClick}
                  >
                    Withdraw
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

export default LiquidityCard
