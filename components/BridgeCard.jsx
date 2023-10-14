import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const BridgeCard = () => {
    return (
        <div className="w-2/3 bg-white p-8 rounded-3xl shadow-md">
            <div className="flex justify-center pt-6">
                <Tabs defaultValue="deposit" className=" w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="deposit">Deposit</TabsTrigger>
                        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                    </TabsList>
                    <TabsContent value="deposit">
                        <Card>
                            <CardHeader>
                                <CardTitle>From</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div>
                                    <Select>
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
                                    <Input id="token" placeholder='0.00' />
                                    <div>
                                        <Select>
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
                                <div className="space-y-1">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" defaultValue="@peduarte" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="withdraw">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>
                                    Change your withdraw here. After saving, you'll be logged out.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Current withdraw</Label>
                                    <Input id="current" type="withdraw" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">New withdraw</Label>
                                    <Input id="new" type="withdraw" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save withdraw</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default BridgeCard