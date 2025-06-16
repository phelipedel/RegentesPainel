"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Trash2, Plus, Package, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ItemInventario {
  id: string
  nome: string
  quantidade: number
  valor: number
  data: string
}

export default function Inventario() {
  const [saldoTotal] = useState(54000) // Vem das entradas
  const [itens, setItens] = useState<ItemInventario[]>([
    { id: "1", nome: "Armas Tier 3", quantidade: 50, valor: 25000, data: "2024-01-15" },
    { id: "2", nome: "Munição", quantidade: 1000, valor: 5000, data: "2024-01-14" },
    { id: "3", nome: "Coletes", quantidade: 30, valor: 15000, data: "2024-01-13" },
  ])

  const [novoItem, setNovoItem] = useState({
    nome: "",
    quantidade: "",
    valor: "",
  })

  const [editandoItem, setEditandoItem] = useState<ItemInventario | null>(null)

  const adicionarItem = () => {
    if (novoItem.nome && novoItem.quantidade && novoItem.valor) {
      const item: ItemInventario = {
        id: Date.now().toString(),
        nome: novoItem.nome,
        quantidade: Number.parseInt(novoItem.quantidade),
        valor: Number.parseFloat(novoItem.valor),
        data: new Date().toISOString().split("T")[0],
      }
      setItens([item, ...itens])
      setNovoItem({ nome: "", quantidade: "", valor: "" })
    }
  }

  const editarItem = () => {
    if (editandoItem && editandoItem.nome && editandoItem.quantidade && editandoItem.valor) {
      setItens(itens.map((item) => (item.id === editandoItem.id ? editandoItem : item)))
      setEditandoItem(null)
    }
  }

  const removerItem = (id: string) => {
    setItens(itens.filter((item) => item.id !== id))
  }

  const totalGasto = itens.reduce((acc, item) => acc + item.valor, 0)
  const saldoRestante = saldoTotal - totalGasto
  const percentualGasto = (totalGasto / saldoTotal) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          filter: "blur(3px)",
        }}
      />

      <div className="relative z-10 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <Package className="h-10 w-10 text-blue-400" />
              Inventário de Compras
            </h1>
            <p className="text-slate-300 text-lg">Controle de itens adquiridos e saldo disponível</p>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Saldo Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">R$ {saldoTotal.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Total Gasto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-400">R$ {totalGasto.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Saldo Restante</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">R$ {saldoRestante.toLocaleString()}</div>
                <Progress value={100 - percentualGasto} className="mt-2" />
                <p className="text-xs text-slate-300 mt-1">{(100 - percentualGasto).toFixed(1)}% disponível</p>
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Novo Item */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-400" />
                Adicionar Item ao Inventário
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="nome" className="text-white">
                    Nome do Item
                  </Label>
                  <Input
                    id="nome"
                    value={novoItem.nome}
                    onChange={(e) => setNovoItem({ ...novoItem, nome: e.target.value })}
                    placeholder="Ex: Armas, Munição..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label htmlFor="quantidade" className="text-white">
                    Quantidade
                  </Label>
                  <Input
                    id="quantidade"
                    type="number"
                    value={novoItem.quantidade}
                    onChange={(e) => setNovoItem({ ...novoItem, quantidade: e.target.value })}
                    placeholder="0"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label htmlFor="valor" className="text-white">
                    Valor Total (R$)
                  </Label>
                  <Input
                    id="valor"
                    type="number"
                    value={novoItem.valor}
                    onChange={(e) => setNovoItem({ ...novoItem, valor: e.target.value })}
                    placeholder="0.00"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={adicionarItem} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Itens */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle>Itens do Inventário</CardTitle>
              <CardDescription className="text-slate-300">Lista completa de itens adquiridos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-white">Item</TableHead>
                      <TableHead className="text-white">Quantidade</TableHead>
                      <TableHead className="text-white">Valor Total</TableHead>
                      <TableHead className="text-white">Valor Unitário</TableHead>
                      <TableHead className="text-white">Data</TableHead>
                      <TableHead className="text-white text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itens.map((item) => (
                      <TableRow key={item.id} className="border-white/10">
                        <TableCell className="font-medium text-white">{item.nome}</TableCell>
                        <TableCell className="text-blue-400">{item.quantidade}</TableCell>
                        <TableCell className="text-red-400 font-semibold">R$ {item.valor.toLocaleString()}</TableCell>
                        <TableCell className="text-slate-300">R$ {(item.valor / item.quantidade).toFixed(2)}</TableCell>
                        <TableCell className="text-slate-300">{new Date(item.data).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditandoItem(item)}
                                  className="bg-blue-600/20 border-blue-600/50 text-blue-400 hover:bg-blue-600/30"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-slate-900 border-white/20 text-white">
                                <DialogHeader>
                                  <DialogTitle>Editar Item</DialogTitle>
                                  <DialogDescription className="text-slate-300">
                                    Modifique as informações do item
                                  </DialogDescription>
                                </DialogHeader>
                                {editandoItem && (
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="edit-nome" className="text-white">
                                        Nome do Item
                                      </Label>
                                      <Input
                                        id="edit-nome"
                                        value={editandoItem.nome}
                                        onChange={(e) => setEditandoItem({ ...editandoItem, nome: e.target.value })}
                                        className="bg-white/10 border-white/20 text-white"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="edit-quantidade" className="text-white">
                                        Quantidade
                                      </Label>
                                      <Input
                                        id="edit-quantidade"
                                        type="number"
                                        value={editandoItem.quantidade}
                                        onChange={(e) =>
                                          setEditandoItem({
                                            ...editandoItem,
                                            quantidade: Number.parseInt(e.target.value),
                                          })
                                        }
                                        className="bg-white/10 border-white/20 text-white"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="edit-valor" className="text-white">
                                        Valor Total
                                      </Label>
                                      <Input
                                        id="edit-valor"
                                        type="number"
                                        value={editandoItem.valor}
                                        onChange={(e) =>
                                          setEditandoItem({ ...editandoItem, valor: Number.parseFloat(e.target.value) })
                                        }
                                        className="bg-white/10 border-white/20 text-white"
                                      />
                                    </div>
                                    <Button onClick={editarItem} className="w-full bg-blue-600 hover:bg-blue-700">
                                      Salvar Alterações
                                    </Button>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removerItem(item.id)}
                              className="bg-red-600/20 border-red-600/50 text-red-400 hover:bg-red-600/30"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
