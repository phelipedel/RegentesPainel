"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Plus, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function EntradasDinheiro() {
  const [entradas, setEntradas] = useState([])
  const [novaEntrada, setNovaEntrada] = useState({
    nome: "",
    quantidade: "",
  })

  // Carregar dados do localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("regentes-data")
    if (savedData) {
      const data = JSON.parse(savedData)
      setEntradas(data.entradas || [])
    }
  }, [])

  // Salvar dados no localStorage
  const salvarDados = (novasEntradas) => {
    const savedData = localStorage.getItem("regentes-data")
    const data = savedData ? JSON.parse(savedData) : {}
    data.entradas = novasEntradas
    localStorage.setItem("regentes-data", JSON.stringify(data))
  }

  const adicionarEntrada = () => {
    if (novaEntrada.nome && novaEntrada.quantidade) {
      const entrada = {
        id: Date.now().toString(),
        nome: novaEntrada.nome,
        quantidade: Number.parseFloat(novaEntrada.quantidade),
        data: new Date().toISOString().split("T")[0],
      }
      const novasEntradas = [entrada, ...entradas]
      setEntradas(novasEntradas)
      salvarDados(novasEntradas)
      setNovaEntrada({ nome: "", quantidade: "" })
    }
  }

  const removerEntrada = (id) => {
    const novasEntradas = entradas.filter((entrada) => entrada.id !== id)
    setEntradas(novasEntradas)
    salvarDados(novasEntradas)
  }

  const totalEntradas = entradas.reduce((acc, entrada) => acc + entrada.quantidade, 0)

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
              <DollarSign className="h-10 w-10 text-green-400" />
              Entradas de Dinheiro
            </h1>
            <p className="text-slate-300 text-lg">Controle de contribuições dos membros</p>
          </div>

          {/* Card de Resumo */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-green-400">
                Total Arrecadado: R$ {totalEntradas.toLocaleString()}
              </CardTitle>
              <CardDescription className="text-slate-300">{entradas.length} contribuições registradas</CardDescription>
            </CardHeader>
          </Card>

          {/* Formulário de Nova Entrada */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-400" />
                Nova Entrada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="nome" className="text-white">
                    Nome do Membro
                  </Label>
                  <Input
                    id="nome"
                    value={novaEntrada.nome}
                    onChange={(e) => setNovaEntrada({ ...novaEntrada, nome: e.target.value })}
                    placeholder="Digite o nome..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label htmlFor="quantidade" className="text-white">
                    Valor (R$)
                  </Label>
                  <Input
                    id="quantidade"
                    type="number"
                    value={novaEntrada.quantidade}
                    onChange={(e) => setNovaEntrada({ ...novaEntrada, quantidade: e.target.value })}
                    placeholder="0.00"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={adicionarEntrada} className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Entradas */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle>Histórico de Entradas</CardTitle>
              <CardDescription className="text-slate-300">Lista completa de todas as contribuições</CardDescription>
            </CardHeader>
            <CardContent>
              {entradas.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20">
                        <TableHead className="text-white">Nome</TableHead>
                        <TableHead className="text-white">Valor</TableHead>
                        <TableHead className="text-white">Data</TableHead>
                        <TableHead className="text-white">Status</TableHead>
                        <TableHead className="text-white text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {entradas.map((entrada) => (
                        <TableRow key={entrada.id} className="border-white/10">
                          <TableCell className="font-medium text-white">{entrada.nome}</TableCell>
                          <TableCell className="text-green-400 font-semibold">
                            R$ {entrada.quantidade.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {new Date(entrada.data).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-600 text-white">Confirmado</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removerEntrada(entrada.id)}
                              className="bg-red-600/20 border-red-600/50 text-red-400 hover:bg-red-600/30"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">Nenhuma entrada registrada ainda.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
