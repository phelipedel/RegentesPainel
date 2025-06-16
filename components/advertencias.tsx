"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, AlertTriangle, Search, Calendar } from "lucide-react"

interface Advertencia {
  id: string
  nome: string
  descricao: string
  data: string
  gravidade: "leve" | "moderada" | "grave"
  aplicadaPor: string
}

export default function Advertencias() {
  const [advertencias, setAdvertencias] = useState<Advertencia[]>([
    {
      id: "1",
      nome: "Carlos Mendes",
      descricao: "Não cumpriu meta mensal estabelecida",
      data: "2024-01-15",
      gravidade: "moderada",
      aplicadaPor: "Admin",
    },
    {
      id: "2",
      nome: "Lucas Oliveira",
      descricao: "Ausência em reunião obrigatória sem justificativa",
      data: "2024-01-10",
      gravidade: "leve",
      aplicadaPor: "Líder",
    },
    {
      id: "3",
      nome: "Rafael Santos",
      descricao: "Comportamento inadequado durante operação",
      data: "2024-01-08",
      gravidade: "grave",
      aplicadaPor: "Admin",
    },
  ])

  const [novaAdvertencia, setNovaAdvertencia] = useState({
    nome: "",
    descricao: "",
    gravidade: "leve" as "leve" | "moderada" | "grave",
    aplicadaPor: "",
  })

  const [busca, setBusca] = useState("")

  const adicionarAdvertencia = () => {
    if (novaAdvertencia.nome && novaAdvertencia.descricao && novaAdvertencia.aplicadaPor) {
      const advertencia: Advertencia = {
        id: Date.now().toString(),
        nome: novaAdvertencia.nome,
        descricao: novaAdvertencia.descricao,
        data: new Date().toISOString().split("T")[0],
        gravidade: novaAdvertencia.gravidade,
        aplicadaPor: novaAdvertencia.aplicadaPor,
      }
      setAdvertencias([advertencia, ...advertencias])
      setNovaAdvertencia({ nome: "", descricao: "", gravidade: "leve", aplicadaPor: "" })
    }
  }

  const removerAdvertencia = (id: string) => {
    setAdvertencias(advertencias.filter((adv) => adv.id !== id))
  }

  const advertenciasFiltradas = advertencias.filter(
    (adv) =>
      adv.nome.toLowerCase().includes(busca.toLowerCase()) || adv.descricao.toLowerCase().includes(busca.toLowerCase()),
  )

  const getGravidadeColor = (gravidade: string) => {
    switch (gravidade) {
      case "grave":
        return "bg-red-600 text-white"
      case "moderada":
        return "bg-yellow-600 text-white"
      case "leve":
        return "bg-blue-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getGravidadeBorder = (gravidade: string) => {
    switch (gravidade) {
      case "grave":
        return "border-red-600/50 bg-red-600/10"
      case "moderada":
        return "border-yellow-600/50 bg-yellow-600/10"
      case "leve":
        return "border-blue-600/50 bg-blue-600/10"
      default:
        return "border-gray-600/50 bg-gray-600/10"
    }
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
              <AlertTriangle className="h-10 w-10 text-red-400" />
              Sistema de Advertências
            </h1>
            <p className="text-slate-300 text-lg">Controle disciplinar e registro de infrações</p>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-400">{advertencias.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Graves</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">
                  {advertencias.filter((a) => a.gravidade === "grave").length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Moderadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">
                  {advertencias.filter((a) => a.gravidade === "moderada").length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Leves</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">
                  {advertencias.filter((a) => a.gravidade === "leve").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Nova Advertência */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-red-400" />
                Nova Advertência
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome" className="text-white">
                    Nome do Membro
                  </Label>
                  <Input
                    id="nome"
                    value={novaAdvertencia.nome}
                    onChange={(e) => setNovaAdvertencia({ ...novaAdvertencia, nome: e.target.value })}
                    placeholder="Nome completo..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label htmlFor="aplicadaPor" className="text-white">
                    Aplicada Por
                  </Label>
                  <Input
                    id="aplicadaPor"
                    value={novaAdvertencia.aplicadaPor}
                    onChange={(e) => setNovaAdvertencia({ ...novaAdvertencia, aplicadaPor: e.target.value })}
                    placeholder="Seu nome..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="descricao" className="text-white">
                    Descrição da Infração
                  </Label>
                  <Textarea
                    id="descricao"
                    value={novaAdvertencia.descricao}
                    onChange={(e) => setNovaAdvertencia({ ...novaAdvertencia, descricao: e.target.value })}
                    placeholder="Descreva detalhadamente a infração..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 min-h-[100px]"
                  />
                </div>
                <div>
                  <Label htmlFor="gravidade" className="text-white">
                    Gravidade
                  </Label>
                  <select
                    id="gravidade"
                    value={novaAdvertencia.gravidade}
                    onChange={(e) =>
                      setNovaAdvertencia({
                        ...novaAdvertencia,
                        gravidade: e.target.value as "leve" | "moderada" | "grave",
                      })
                    }
                    className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
                  >
                    <option value="leve">Leve</option>
                    <option value="moderada">Moderada</option>
                    <option value="grave">Grave</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button onClick={adicionarAdvertencia} className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Aplicar Advertência
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campo de Busca */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-400" />
                Buscar Advertências
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por nome ou descrição..."
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
            </CardContent>
          </Card>

          {/* Lista de Advertências */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle>Registro de Advertências</CardTitle>
              <CardDescription className="text-slate-300">
                {advertenciasFiltradas.length} advertências encontradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {advertenciasFiltradas.map((advertencia) => (
                  <div
                    key={advertencia.id}
                    className={`p-4 rounded-lg border transition-all duration-300 ${getGravidadeBorder(advertencia.gravidade)}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                          <h3 className="font-bold text-xl text-white">{advertencia.nome}</h3>
                          <Badge className={getGravidadeColor(advertencia.gravidade)}>
                            {advertencia.gravidade.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="bg-white/5 p-3 rounded-md mb-3">
                          <p className="text-slate-200 leading-relaxed">{advertencia.descricao}</p>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-slate-300">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(advertencia.data).toLocaleDateString()}</span>
                          </div>
                          <div>
                            Aplicada por: <span className="text-white font-medium">{advertencia.aplicadaPor}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => removerAdvertencia(advertencia.id)}
                          className="bg-red-600/20 border-red-600/50 text-red-400 hover:bg-red-600/30"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {advertenciasFiltradas.length === 0 && (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">
                      {busca
                        ? "Nenhuma advertência encontrada com os critérios de busca."
                        : "Nenhuma advertência registrada."}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
