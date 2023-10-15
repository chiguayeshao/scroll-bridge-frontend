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
import { useAccount } from "wagmi"

const BridgeCard = () => {
  const [inputValueDeposit, setInputValueDeposit] = useState("")
  const [selectedNetworkDeposit, setSelectedNetworkDeposit] = useState("")
  const [selectedTokenDeposit, setSelectedTokenDeposit] = useState("")

  const [inputValueWithdraw, setInputValueWithdraw] = useState("")
  const [selectedNetworkWithdraw, setSelectedNetworkWithdraw] = useState("")
  const [selectedTokenWithdraw, setSelectedTokenWithdraw] = useState("")

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

  const { isDisconnected } = useAccount()
  return (
    <div className="w-2/3 bg-white p-8 rounded-3xl shadow-md">
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
                <CardTitle>From</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Select
                    onValueChange={(value) => setSelectedNetworkDeposit(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select NetWork" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Network</SelectLabel>
                        <SelectItem value="Ethereum">Ethereum</SelectItem>
                        <SelectItem value="Polygon">Polygon</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-row items-center justify-center gap-4">
                  <Input
                    id="token"
                    placeholder="0.00"
                    value={inputValueDeposit}
                    onChange={(e) => setInputValueDeposit(e.target.value)}
                  />
                  <div>
                    <Select onValueChange={(value) => setSelectedTokenDeposit(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Token" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Token</SelectLabel>
                          <SelectItem value="ETH">ETH</SelectItem>
                          <SelectItem value="USDT">USDT</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardHeader>
                <CardTitle>To</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Image
                    src="/scrollLogo.svg"
                    alt="scrollLogo"
                    width={128}
                    height={96}
                  />
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

          {/* withdraw */}
          <TabsContent value="withdraw">
            <Card>
              <CardHeader>
                <CardTitle>From</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Image
                    src="/scrollLogo.svg"
                    alt="scrollLogo"
                    width={128}
                    height={96}
                  />
                </div>
              </CardContent>
              <CardHeader>
                <CardTitle>To</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Select
                    onValueChange={(value) => setSelectedNetworkWithdraw(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select NetWork" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Network</SelectLabel>
                        <SelectItem value="Ethereum">Ethereum</SelectItem>
                        <SelectItem value="Polygon">Polygon</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-row items-center justify-center gap-4">
                  <Input
                    id="token"
                    placeholder="0.00"
                    value={inputValueWithdraw}
                    onChange={(e) => setInputValueWithdraw(e.target.value)}
                  />
                  <div>
                    <Select
                      onValueChange={(value) => setSelectedTokenWithdraw(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Token" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Token</SelectLabel>
                          <SelectItem value="ETH">ETH</SelectItem>
                          <SelectItem value="USDT">USDT</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
