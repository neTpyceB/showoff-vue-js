import cors from 'cors'
import express from 'express'
import { canPerform, getPolicies, getTenant, moduleCatalog } from './domain.mjs'

export function createModuleService() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ ok: true })
  })

  app.get('/tenants/:tenantId/bootstrap', (req, res) => {
    const tenant = getTenant(req.params.tenantId)
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' })
    }

    const role = String(req.query.role ?? 'viewer')
    const modules = tenant.modules.map((key) => moduleCatalog[key])
    const policies = getPolicies(role, tenant.modules)

    return res.json({
      tenant,
      modules,
      policies,
      navigation: modules.map((moduleItem) => ({
        key: moduleItem.key,
        title: moduleItem.title,
        path: moduleItem.path,
      })),
    })
  })

  app.post('/tenants/:tenantId/modules/:moduleKey/run', (req, res) => {
    const tenant = getTenant(req.params.tenantId)
    const moduleItem = moduleCatalog[req.params.moduleKey]
    const role = req.headers['x-role']
    const userName = req.headers['x-user-name']

    if (!tenant || !moduleItem || !tenant.modules.includes(moduleItem.key)) {
      return res.status(404).json({ message: 'Module not enabled' })
    }

    const policies = getPolicies(String(role ?? 'viewer'), tenant.modules)
    if (!canPerform(policies, moduleItem.key, 'manage')) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    return res.json({
      ok: true,
      notice: `${String(userName ?? 'User')} ran ${moduleItem.actionLabel.toLowerCase()} for ${tenant.name}.`,
    })
  })

  return app
}
