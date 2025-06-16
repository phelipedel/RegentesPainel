"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Package, FileText, AlertTriangle, Target, TrendingUp, Users, Activity } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function Dashboard() {
  const [data, setData] = useState({
    entradas: [],
    inventario: [],
    solicitacoes: [],
    advertencias: [],
    metas: [],
  })

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedData = localStorage.getItem("regentes-data")
    if (savedData) {
      setData(JSON.parse(savedData))
    }
  }, [])

  // Cálculos para o dashboard
  const saldoTotal = data.entradas.reduce((acc, entrada) => acc + entrada.quantidade, 0)
  const gastoInventario = data.inventario.reduce((acc, item) => acc + item.valor, 0)
  const saldoDisponivel = saldoTotal - gastoInventario

  // Dados para gráficos - usando dados de exemplo se não houver dados reais
  const rankingData =
    data.metas.length > 0 && data.metas[0]?.participantes
      ? data.metas[0].participantes
          .sort((a, b) => b.valor - a.valor)
          .slice(0, 5)
          .map((p) => ({
            nome: p.nome.split(" ")[0],
            valor: p.valor,
            status: p.status,
          }))
      : [
          { nome: "Sem", valor: 0, status: "pendente" },
          { nome: "Dados", valor: 0, status: "pendente" },
        ]

  const metaCumprida =
    data.metas.length > 0 && data.metas[0]?.participantes
      ? data.metas[0].participantes.filter((p) => p.status === "feito").length
      : 0
  const totalParticipantes =
    data.metas.length > 0 && data.metas[0]?.participantes ? data.metas[0].participantes.length : 0
  const progressoMeta = totalParticipantes > 0 ? (metaCumprida / totalParticipantes) * 100 : 0

  const statusData = [
    { name: "Cumpridas", value: metaCumprida, color: "#22c55e" },
    { name: "Pendentes", value: totalParticipantes - metaCumprida, color: "#ef4444" },
  ]

  const prioridadeData = [
    {
      name: "Alta",
      value: data.solicitacoes.filter((s) => s.prioridade === "alta").length,
      color: "#ef4444",
    },
    {
      name: "Média",
      value: data.solicitacoes.filter((s) => s.prioridade === "média").length,
      color: "#f59e0b",
    },
    {
      name: "Baixa",
      value: data.solicitacoes.filter((s) => s.prioridade === "baixa").length,
      color: "#22c55e",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Background com blur */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          filter: "blur(3px)",
        }}
      />

      <div className="relative z-10 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Dashboard Regentes</h1>
            <p className="text-slate-300 text-lg">Controle completo do clã</p>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
                <DollarSign className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">R$ {saldoTotal.toLocaleString()}</div>
                <p className="text-xs text-slate-300">Total arrecadado</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
                <Activity className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">R$ {saldoDisponivel.toLocaleString()}</div>
                <Progress value={saldoTotal > 0 ? (saldoDisponivel / saldoTotal) * 100 : 0} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Metas Cumpridas</CardTitle>
                <Target className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">
                  {metaCumprida}/{totalParticipantes}
                </div>
                <Progress value={progressoMeta} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Advertências</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-400">{data.advertencias.length}</div>
                <p className="text-xs text-slate-300">Registradas</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos Principais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Ranking de Contribuições
                </CardTitle>
                <CardDescription className="text-slate-300">Membros que mais contribuíram</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    valor: {
                      label: "Valor",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rankingData}>
                      <XAxis
                        dataKey="nome"
                        tick={{ fill: "white", fontSize: 12 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.3)" }}
                      />
                      <YAxis tick={{ fill: "white", fontSize: 12 }} axisLine={{ stroke: "rgba(255,255,255,0.3)" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="valor" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  Status das Metas
                </CardTitle>
                <CardDescription className="text-slate-300">Distribuição do cumprimento de metas</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Quantidade",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {statusData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-slate-300">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Atalhos Rápidos */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle>Atalhos Rápidos</CardTitle>
              <CardDescription className="text-slate-300">Acesso rápido às principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <DollarSign className="h-6 w-6 text-green-400" />
                  <span className="text-xs">Entradas</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <Package className="h-6 w-6 text-blue-400" />
                  <span className="text-xs">Inventário</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <FileText className="h-6 w-6 text-yellow-400" />
                  <span className="text-xs">Solicitações</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <span className="text-xs">Advertências</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <Target className="h-6 w-6 text-purple-400" />
                  <span className="text-xs">Metas</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resumo de Atividades Recentes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-yellow-400" />
                  Solicitações Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.solicitacoes.length > 0 ? (
                    data.solicitacoes
                      .filter((s) => s.status === "pendente")
                      .slice(0, 3)
                      .map((solicitacao) => (
                        <div
                          key={solicitacao.id}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{solicitacao.nome}</p>
                            <p className="text-sm text-slate-300">Qtd: {solicitacao.quantidade}</p>
                          </div>
                          <Badge
                            variant={
                              solicitacao.prioridade === "alta"
                                ? "destructive"
                                : solicitacao.prioridade === "média"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {solicitacao.prioridade}
                          </Badge>
                        </div>
                      ))
                  ) : (
                    <p className="text-slate-400 text-center py-4">Nenhuma solicitação pendente</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  Advertências Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.advertencias.length > 0 ? (
                    data.advertencias.slice(0, 3).map((advertencia) => (
                      <div
                        key={advertencia.id}
                        className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-red-400">{advertencia.nome}</p>
                          <p className="text-sm text-slate-300">{advertencia.descricao}</p>
                        </div>
                        <span className="text-xs text-slate-400">
                          {new Date(advertencia.data).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-center py-4">Nenhuma advertência registrada</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
