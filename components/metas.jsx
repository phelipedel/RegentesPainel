"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Plus, RotateCcw, Check, Users, TrendingUp, Clock, CheckCheck } from "lucide-react"

export default function Metas() {
  const [metas, setMetas] = useState([])
  const [novaMeta, setNovaMeta] = useState({
    titulo: "",
    descricao: "",
    valorMeta: "",
    dataFim: "",
  })
  const [novoParticipante, setNovoParticipante] = useState({
    nome: "",
    valor: "",
  })
  const [metaSelecionada, setMetaSelecionada] = useState("")

  // Carregar dados do localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("regentes-data")
    if (savedData) {
      const data = JSON.parse(savedData)
      setMetas(data.metas || [])
      if (data.metas && data.metas.length > 0) {
        setMetaSelecionada(data.metas[0].id)
      }
    }
  }, [])

  // Salvar dados no localStorage
  const salvarDados = (novasMetas) => {
    const savedData = localStorage.getItem("regentes-data")
    const data = savedData ? JSON.parse(savedData) : {}
    data.metas = novasMetas
    localStorage.setItem("regentes-data", JSON.stringify(data))
  }

  const adicionarMeta = () => {
    if (novaMeta.titulo && novaMeta.valorMeta && novaMeta.dataFim) {
      const meta = {
        id: Date.now().toString(),
        titulo: novaMeta.titulo,
        descricao: novaMeta.descricao,
        valorMeta: Number.parseFloat(novaMeta.valorMeta),
        dataInicio: new Date().toISOString().split("T")[0],
        dataFim: novaMeta.dataFim,
        participantes: [],
      }
      const novasMetas = [meta, ...metas]
      setMetas(novasMetas)
      salvarDados(novasMetas)
      setNovaMeta({ titulo: "", descricao: "", valorMeta: "", dataFim: "" })
      setMetaSelecionada(meta.id)
    }
  }

  const adicionarParticipante = () => {
    if (novoParticipante.nome && novoParticipante.valor && metaSelecionada) {
      const participante = {
        id: Date.now().toString(),
        nome: novoParticipante.nome,
        status: "pendente",
        valor: Number.parseFloat(novoParticipante.valor),
        dataUltimaAtualizacao: new Date().toISOString().split("T")[0],
      }

      const novasMetas = metas.map((meta) =>
        meta.id === metaSelecionada ? { ...meta, participantes: [...meta.participantes, participante] } : meta,
      )
      setMetas(novasMetas)
      salvarDados(novasMetas)
      setNovoParticipante({ nome: "", valor: "" })
    }
  }

  const marcarParticipante = (metaId, participanteId, novoStatus) => {
    const novasMetas = metas.map((meta) =>
      meta.id === metaId
        ? {
            ...meta,
            participantes: meta.participantes.map((p) =>
              p.id === participanteId
                ? {
                    ...p,
                    status: novoStatus,
                    dataUltimaAtualizacao: new Date().toISOString().split("T")[0],
                  }
                : p,
            ),
          }
        : meta,
    )
    setMetas(novasMetas)
    salvarDados(novasMetas)
  }

  const resetarMeta = (metaId) => {
    const novasMetas = metas.map((meta) =>
      meta.id === metaId
        ? {
            ...meta,
            participantes: meta.participantes.map((p) => ({
              ...p,
              status: "pendente",
              dataUltimaAtualizacao: new Date().toISOString().split("T")[0],
            })),
          }
        : meta,
    )
    setMetas(novasMetas)
    salvarDados(novasMetas)
  }

  const metaAtual = metas.find((m) => m.id === metaSelecionada)
  const participantesCumpridos = metaAtual?.participantes.filter((p) => p.status === "feito").length || 0
  const participantesParciais = metaAtual?.participantes.filter((p) => p.status === "feito_pela_metade").length || 0
  const totalParticipantes = metaAtual?.participantes.length || 0
  const progressoMeta =
    totalParticipantes > 0 ? ((participantesCumpridos + participantesParciais * 0.5) / totalParticipantes) * 100 : 0
  const valorArrecadado =
    metaAtual?.participantes.reduce((acc, p) => {
      if (p.status === "feito") return acc + p.valor
      if (p.status === "feito_pela_metade") return acc + p.valor * 0.5
      return acc
    }, 0) || 0
  const progressoValor = metaAtual ? (valorArrecadado / metaAtual.valorMeta) * 100 : 0

  const getStatusColor = (status) => {
    switch (status) {
      case "feito":
        return "bg-green-600 text-white"
      case "feito_pela_metade":
        return "bg-yellow-600 text-white"
      case "pendente":
        return "bg-gray-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "feito":
        return <CheckCheck className="h-4 w-4" />
      case "feito_pela_metade":
        return <Clock className="h-4 w-4" />
      case "pendente":
        return <Check className="h-4 w-4" />
      default:
        return <Check className="h-4 w-4" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "feito":
        return "Cumprida"
      case "feito_pela_metade":
        return "Feito pela Metade"
      case "pendente":
        return "Pendente"
      default:
        return "Pendente"
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
              <Target className="h-10 w-10 text-purple-400" />
              Controle de Metas
            </h1>
            <p className="text-slate-300 text-lg">Definição e acompanhamento de objetivos do clã</p>
          </div>

          {/* Seletor de Meta */}
          {metas.length > 0 && (
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle>Selecionar Meta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {metas.map((meta) => (
                    <Button
                      key={meta.id}
                      variant={metaSelecionada === meta.id ? "default" : "outline"}
                      onClick={() => setMetaSelecionada(meta.id)}
                      className={`p-4 h-auto flex-col items-start ${
                        metaSelecionada === meta.id
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="font-semibold">{meta.titulo}</div>
                      <div className="text-sm opacity-80">{meta.descricao}</div>
                      <div className="text-xs mt-1">
                        {new Date(meta.dataInicio).toLocaleDateString()} - {new Date(meta.dataFim).toLocaleDateString()}
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Cards de Resumo da Meta Atual */}
          {metaAtual && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-lg">Participantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">
                    {participantesCumpridos}/{totalParticipantes}
                  </div>
                  <Progress value={progressoMeta} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-lg">Cumpridas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">{participantesCumpridos}</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-lg">Pela Metade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">{participantesParciais}</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-lg">Arrecadado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">R$ {valorArrecadado.toLocaleString()}</div>
                  <Progress value={progressoValor} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-lg">Restante</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">
                    R$ {(metaAtual.valorMeta - valorArrecadado).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Formulário de Nova Meta */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-purple-400" />
                Criar Nova Meta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="titulo" className="text-white">
                    Título da Meta
                  </Label>
                  <Input
                    id="titulo"
                    value={novaMeta.titulo}
                    onChange={(e) => setNovaMeta({ ...novaMeta, titulo: e.target.value })}
                    placeholder="Ex: Meta Mensal Fevereiro"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label htmlFor="valorMeta" className="text-white">
                    Valor da Meta (R$)
                  </Label>
                  <Input
                    id="valorMeta"
                    type="number"
                    value={novaMeta.valorMeta}
                    onChange={(e) => setNovaMeta({ ...novaMeta, valorMeta: e.target.value })}
                    placeholder="50000"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label htmlFor="descricao" className="text-white">
                    Descrição
                  </Label>
                  <Input
                    id="descricao"
                    value={novaMeta.descricao}
                    onChange={(e) => setNovaMeta({ ...novaMeta, descricao: e.target.value })}
                    placeholder="Descrição da meta..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label htmlFor="dataFim" className="text-white">
                    Data Limite
                  </Label>
                  <Input
                    id="dataFim"
                    type="date"
                    value={novaMeta.dataFim}
                    onChange={(e) => setNovaMeta({ ...novaMeta, dataFim: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <Button onClick={adicionarMeta} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Meta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Adicionar Participante */}
          {metaAtual && (
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  Adicionar Participante à Meta: {metaAtual.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="nomeParticipante" className="text-white">
                      Nome do Participante
                    </Label>
                    <Input
                      id="nomeParticipante"
                      value={novoParticipante.nome}
                      onChange={(e) => setNovoParticipante({ ...novoParticipante, nome: e.target.value })}
                      placeholder="Nome completo..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="valorParticipante" className="text-white">
                      Valor Individual (R$)
                    </Label>
                    <Input
                      id="valorParticipante"
                      type="number"
                      value={novoParticipante.valor}
                      onChange={(e) => setNovoParticipante({ ...novoParticipante, valor: e.target.value })}
                      placeholder="10000"
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={adicionarParticipante} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de Participantes */}
          {metaAtual && (
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    Participantes da Meta: {metaAtual.titulo}
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {metaAtual.participantes.length} participantes cadastrados
                  </CardDescription>
                </div>
                <Button
                  onClick={() => resetarMeta(metaAtual.id)}
                  variant="outline"
                  className="bg-yellow-600/20 border-yellow-600/50 text-yellow-400 hover:bg-yellow-600/30"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Geral
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metaAtual.participantes.map((participante) => (
                    <div
                      key={participante.id}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        participante.status === "feito"
                          ? "bg-green-600/20 border-green-600/50"
                          : participante.status === "feito_pela_metade"
                            ? "bg-yellow-600/20 border-yellow-600/50"
                            : "bg-white/5 border-white/20"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg text-white">{participante.nome}</h3>
                            <Badge className={getStatusColor(participante.status)}>
                              {getStatusText(participante.status)}
                            </Badge>
                          </div>
                          <div className="text-slate-300 text-sm space-y-1">
                            <p>
                              Valor Individual:{" "}
                              <span className="text-blue-400 font-medium">
                                R$ {participante.valor.toLocaleString()}
                              </span>
                            </p>
                            <p>
                              Última Atualização:{" "}
                              <span className="text-slate-400">
                                {new Date(participante.dataUltimaAtualizacao).toLocaleDateString()}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          <Button
                            onClick={() => marcarParticipante(metaAtual.id, participante.id, "pendente")}
                            className="bg-gray-600 hover:bg-gray-700 text-white"
                            disabled={participante.status === "pendente"}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            Pendente
                          </Button>
                          <Button
                            onClick={() => marcarParticipante(metaAtual.id, participante.id, "feito_pela_metade")}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white"
                            disabled={participante.status === "feito_pela_metade"}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Feito pela Metade
                          </Button>
                          <Button
                            onClick={() => marcarParticipante(metaAtual.id, participante.id, "feito")}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={participante.status === "feito"}
                          >
                            <CheckCheck className="h-4 w-4 mr-2" />
                            OK
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {metaAtual.participantes.length === 0 && (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-400 text-lg">Nenhum participante cadastrado nesta meta.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
