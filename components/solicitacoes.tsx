"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, FileText, Search, Check } from "lucide-react"

interface Solicitacao {
  id: string
  nome: string
  quantidade: number
  prioridade: "baixa" | "média" | "alta"
  status: "pendente" | "feito"
  data: string
  solicitante: string
}

export default function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([
    {
      id: "1",
      nome: "Granadas",
      quantidade: 20,
      prioridade: "alta",
      status: "pendente",
      data: "2024-01-15",
      solicitante: "João Silva",
    },
    {
      id: "2",
      nome: "Kits Médicos",
      quantidade: 15,
      prioridade: "média",
      status: "feito",
      data: "2024-01-14",
      solicitante: "Maria Santos",
    },
    {
      id: "3",
      nome: "Veículos",
      quantidade: 3,
      prioridade: "alta",
      status: "pendente",
      data: "2024-01-13",
      solicitante: "Pedro Costa",
    },
    {
      id: "4",
      nome: "Munição .50",
      quantidade: 500,
      prioridade: "baixa",
      status: "pendente",
      data: "2024-01-12",
      solicitante: "Ana Lima",
    },
  ])

  const [novaSolicitacao, setNovaSolicitacao] = useState({
    nome: "",
    quantidade: "",
    prioridade: "média" as "baixa" | "média" | "alta",
    solicitante: "",
  })

  const [filtros, setFiltros] = useState({
    busca: "",
    prioridade: "todas",
    status: "todos",
  })

  const adicionarSolicitacao = () => {
    if (novaSolicitacao.nome && novaSolicitacao.quantidade && novaSolicitacao.solicitante) {
      const solicitacao: Solicitacao = {
        id: Date.now().toString(),
        nome: novaSolicitacao.nome,
        quantidade: Number.parseInt(novaSolicitacao.quantidade),
        prioridade: novaSolicitacao.prioridade,
        status: "pendente",
        data: new Date().toISOString().split("T")[0],
        solicitante: novaSolicitacao.solicitante,
      }
      setSolicitacoes([solicitacao, ...solicitacoes])
      setNovaSolicitacao({ nome: "", quantidade: "", prioridade: "média", solicitante: "" })
    }
  }

  const marcarComoFeito = (id: string) => {
    setSolicitacoes(solicitacoes.map((sol) => (sol.id === id ? { ...sol, status: "feito" as const } : sol)))
  }

  const removerSolicitacao = (id: string) => {
    setSolicitacoes(solicitacoes.filter((sol) => sol.id !== id))
  }

  const solicitacoesFiltradas = solicitacoes.filter((sol) => {
    const matchBusca =
      sol.nome.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      sol.solicitante.toLowerCase().includes(filtros.busca.toLowerCase())
    const matchPrioridade = filtros.prioridade === "todas" || sol.prioridade === filtros.prioridade
    const matchStatus = filtros.status === "todos" || sol.status === filtros.status

    return matchBusca && matchPrioridade && matchStatus
  })

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "bg-red-600 text-white"
      case "média":
        return "bg-yellow-600 text-white"
      case "baixa":
        return "bg-green-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "feito" ? "bg-green-600 text-white" : "bg-gray-600 text-white"
  }

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
              <FileText className="h-10 w-10 text-yellow-400" />
              Solicitações de Compra
            </h1>
            <p className="text-slate-300 text-lg">Gerenciamento de pedidos e necessidades do clã</p>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">{solicitacoes.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">
                  {solicitacoes.filter((s) => s.status === "pendente").length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Concluídas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">
                  {solicitacoes.filter((s) => s.status === "feito").length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Alta Prioridade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-400">
                  {solicitacoes.filter((s) => s.prioridade === "alta" && s.status === "pendente").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Nova Solicitação */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-yellow-400" />
                Nova Solicitação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="nome" className="text-white">
                    Item Solicitado
                  </Label>
                  <Input
                    id="nome"
                    value={novaSolicitacao.nome}
                    onChange={(e) => setNovaSolicitacao({ ...novaSolicitacao, nome: e.target.value })}
                    placeholder="Ex: Granadas, Kits..."
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
                    value={novaSolicitacao.quantidade}
                    onChange={(e) => setNovaSolicitacao({ ...novaSolicitacao, quantidade: e.target.value })}
                    placeholder="0"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label htmlFor="solicitante" className="text-white">
                    Solicitante
                  </Label>
                  <Input
                    id="solicitante"
                    value={novaSolicitacao.solicitante}
                    onChange={(e) => setNovaSolicitacao({ ...novaSolicitacao, solicitante: e.target.value })}
                    placeholder="Nome do membro"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label htmlFor="prioridade" className="text-white">
                    Prioridade
                  </Label>
                  <Select
                    value={novaSolicitacao.prioridade}
                    onValueChange={(value: "baixa" | "média" | "alta") =>
                      setNovaSolicitacao({ ...novaSolicitacao, prioridade: value })
                    }
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="média">Média</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={adicionarSolicitacao}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filtros */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-400" />
                Filtros e Busca
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="busca" className="text-white">
                    Buscar
                  </Label>
                  <Input
                    id="busca"
                    value={filtros.busca}
                    onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
                    placeholder="Nome do item ou solicitante..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label htmlFor="filtro-prioridade" className="text-white">
                    Prioridade
                  </Label>
                  <Select
                    value={filtros.prioridade}
                    onValueChange={(value) => setFiltros({ ...filtros, prioridade: value })}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="média">Média</SelectItem>
                      <SelectItem value="baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="filtro-status" className="text-white">
                    Status
                  </Label>
                  <Select value={filtros.status} onValueChange={(value) => setFiltros({ ...filtros, status: value })}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="pendente">Pendentes</SelectItem>
                      <SelectItem value="feito">Concluídas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Solicitações */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle>Lista de Solicitações</CardTitle>
              <CardDescription className="text-slate-300">
                {solicitacoesFiltradas.length} solicitações encontradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {solicitacoesFiltradas.map((solicitacao) => (
                  <div
                    key={solicitacao.id}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      solicitacao.status === "feito"
                        ? "bg-green-600/20 border-green-600/50"
                        : "bg-white/5 border-white/20"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-white">{solicitacao.nome}</h3>
                          <Badge className={getPrioridadeColor(solicitacao.prioridade)}>{solicitacao.prioridade}</Badge>
                          <Badge className={getStatusColor(solicitacao.status)}>{solicitacao.status}</Badge>
                        </div>
                        <div className="text-slate-300 text-sm space-y-1">
                          <p>
                            Quantidade: <span className="text-blue-400 font-medium">{solicitacao.quantidade}</span>
                          </p>
                          <p>
                            Solicitante: <span className="text-white font-medium">{solicitacao.solicitante}</span>
                          </p>
                          <p>
                            Data:{" "}
                            <span className="text-slate-400">{new Date(solicitacao.data).toLocaleDateString()}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {solicitacao.status === "pendente" && (
                          <Button
                            onClick={() => marcarComoFeito(solicitacao.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Marcar como Feito
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          onClick={() => removerSolicitacao(solicitacao.id)}
                          className="bg-red-600/20 border-red-600/50 text-red-400 hover:bg-red-600/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
