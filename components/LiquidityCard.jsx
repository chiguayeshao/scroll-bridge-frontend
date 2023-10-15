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
import {
  useAccount,
  useBalance,
  useSwitchNetwork,
  useContractWrite,
  useContractRead
} from "wagmi"
import Abi from "@/config/CrossChainBridge.json"
import { CONTRACT_ADDRESS, SEPOLIA_CONTRACT_ADDRESS } from "@/config/address"
import { ethers, utils } from "ethers"

const LiquidityCard = () => {
  const [inputValueDeposit, setInputValueDeposit] = useState("")
  const [selectPool, setSelectedPool] = useState("Scroll")
  const [selectedTokenDeposit, setSelectedTokenDeposit] = useState("ETH")

  const [inputValueWithdraw, setInputValueWithdraw] = useState("")
  const [selectedTokenWithdraw, setSelectedTokenWithdraw] = useState("ETH")

  const [chainId, setChainId] = useState(534351)

  const [contractAddress, setContractAddress] = useState(CONTRACT_ADDRESS)

  const { address, isDisconnected } = useAccount()
  const { data, isError, isLoading } = useBalance({
    address: address,
    chainId: chainId,
    watch: true,
    cacheTime: 2_000
  })

  const {
    data: poolData,
    isError: poolIsError,
    isLoading: poolIsLoading
  } = useBalance({
    address: contractAddress,
    chainId: chainId,
    watch: true,
    cacheTime: 2_000
  })

  const {
    data: balanceData,
    isError: balanceIsError,
    isLoading: balanceIsLoading
  } = useContractRead({
    address: contractAddress,
    abi: Abi,
    functionName: "deposits",
    args: [
      address
    ],
    chainId: chainId
  })

  const { switchNetwork } = useSwitchNetwork()

  const {
    data: depositData,
    isLoading: depositIsLoading,
    isSuccess: depositIsSuccess,
    write
  } = useContractWrite({
    address: contractAddress,
    abi: Abi,
    functionName: "deposit",
    chainId: chainId
  })

  const handleDepositConfirmClick = () => {
    console.log("Current Tab: Deposit")
    console.log("Input Value (Deposit):", inputValueDeposit)
    console.log("Selected Network (Deposit):", selectPool)
    console.log("Selected Token (Deposit):", selectedTokenDeposit)

    write({
      args: [
        ethers.constants.AddressZero,
        utils.parseEther(inputValueDeposit.toString())
      ],
      value: utils.parseEther(inputValueDeposit.toString())
    })
  }

  const {
    data: withdrawData,
    isLoading: withdrawLoading,
    isSuccess: withdrawSuccess,
    write: withdraw
  } = useContractWrite({
    address: contractAddress,
    abi: Abi,
    functionName: "withdraw",
    chainId: chainId
  })

  const handleWithdrawConfirmClick = () => {
    console.log("Current Tab: Withdraw")
    console.log("Input Value (Withdraw):", inputValueWithdraw)
    console.log("Selected Network (Withdraw):", selectPool)
    console.log("Selected Token (Withdraw):", selectedTokenWithdraw)

    withdraw({
      args: [
        ethers.constants.AddressZero,
        utils.parseEther(inputValueWithdraw.toString())
      ]
    })
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
                  {poolData ? (
                    <div className="font-bold text-xl">
                      <div className="flex flex-row gap-2">
                        Total
                        <div className="text-[#ed7255]">
                          {formatNumber(poolData?.formatted)}
                        </div>
                        ETH In <div>{selectPool}</div> Pool
                      </div>
                    </div>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Select
                    onValueChange={(value) => {
                      setSelectedPool(value)
                      if (value === "Sepolia") {
                        switchNetwork(11155111)
                        setChainId(11155111)
                        setContractAddress(SEPOLIA_CONTRACT_ADDRESS)
                      }
                      if (value === "Scroll") {
                        switchNetwork(534351)
                        setChainId(534351)
                        setContractAddress(CONTRACT_ADDRESS)
                      }
                    }}
                    defaultValue={selectPool}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select NetWork" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Network</SelectLabel>
                        <SelectItem value="Scroll">Scroll</SelectItem>
                        <SelectItem value="Sepolia">Sepolia</SelectItem>
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
                    onClick={() => {
                      if (data) {
                        setInputValueDeposit(formatNumber(data?.formatted))
                      }
                    }}
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
                      In {selectPool}
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
                    onValueChange={(value) => {
                      setSelectedPool(value)
                      if (value === "Sepolia") {
                        switchNetwork(11155111)
                        setChainId(11155111)
                        setContractAddress(SEPOLIA_CONTRACT_ADDRESS)
                      }
                      if (value === "Scroll") {
                        switchNetwork(534351)
                        setChainId(534351)
                        setContractAddress(CONTRACT_ADDRESS)
                      }
                    }}
                    defaultValue={selectPool}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select NetWork" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Network</SelectLabel>
                        <SelectItem value="Scroll">Scroll</SelectItem>
                        <SelectItem value="Sepolia">Sepolia</SelectItem>
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
                  {balanceData ? (
                    <div className="flex flex-row font-bold gap-2">
                      Balance:
                      <div className="text-[#ed7255]">
                        {utils.formatEther(balanceData)}
                      </div>
                      In {selectPool}
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
