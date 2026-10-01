import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Package,
  Layers,
  Upload,
  Loader2,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Tag
} from 'lucide-react';

export default function ImportPreviewModal({
  isOpen,
  onClose,
  previewData,
  onConfirmImport,
  importing,
  importResult
}) {
  const [expandedGroup, setExpandedGroup] = useState(null);

  if (!isOpen) return null;

  const toggleGroup = (idx) => {
    setExpandedGroup(expandedGroup === idx ? null : idx);
  };

  const targetCategory = previewData?.targetCategory || 'all';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-zinc-200 text-left">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 bg-zinc-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
                  {importResult ? 'Import Result Summary' : 'Import Preview & Validation'}
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                  <Tag className="w-3 h-3" />
                  Target Category: {targetCategory === 'all' ? 'All Categories' : targetCategory}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                {importResult
                  ? 'Products & variants have been processed in MongoDB.'
                  : 'Review category safety, existing updates, new variants, and validation warnings before confirming.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={importing}
            className="p-2 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer border-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* SUCCESS RESULT SCREEN */}
          {importResult ? (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3 text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">Product Sheet Imported Successfully!</h4>
                  <p className="text-xs mt-1 text-emerald-800">
                    Storefront product catalog and admin inventory have been updated in MongoDB. Live sync triggered.
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60 text-center">
                  <div className="text-2xl font-black text-amber-600">{importResult.productsUpdated || 0}</div>
                  <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1">Products Updated</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60 text-center">
                  <div className="text-2xl font-black text-emerald-600">{importResult.productsCreated || 0}</div>
                  <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1">New Products</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60 text-center">
                  <div className="text-2xl font-black text-indigo-600">{importResult.variantsUpdated || 0}</div>
                  <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1">Variants Updated</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60 text-center">
                  <div className="text-2xl font-black text-purple-600">{importResult.variantsCreated || 0}</div>
                  <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1">New Variants</div>
                </div>
              </div>

              {/* Errors/Warnings if any */}
              {importResult.warnings && importResult.warnings.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-amber-800 uppercase tracking-wider">Import Warnings ({importResult.warnings.length})</h5>
                  <div className="max-h-40 overflow-y-auto rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-xs space-y-1">
                    {importResult.warnings.map((w, idx) => (
                      <div key={idx} className="text-amber-900 font-mono">
                        • Row {w.rowNumber}: {w.warning}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* PREVIEW SCREEN */
            <>
              {/* Top Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-100 text-center">
                  <div className="text-lg font-black text-blue-700">{previewData?.totalRows || 0}</div>
                  <div className="text-[10px] font-bold text-blue-600/80 uppercase">Total Rows</div>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-center">
                  <div className="text-lg font-black text-emerald-700">{previewData?.validRows || 0}</div>
                  <div className="text-[10px] font-bold text-emerald-600/80 uppercase">Valid Rows</div>
                </div>
                <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-100 text-center">
                  <div className="text-lg font-black text-rose-700">{previewData?.invalidRows || 0}</div>
                  <div className="text-[10px] font-bold text-rose-600/80 uppercase">Invalid Rows</div>
                </div>
                <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-100 text-center">
                  <div className="text-lg font-black text-amber-700">{previewData?.productsToUpdateCount || 0}</div>
                  <div className="text-[10px] font-bold text-amber-600/80 uppercase">Prods To Update</div>
                </div>
                <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-center">
                  <div className="text-lg font-black text-indigo-700">{previewData?.productsToCreateCount || 0}</div>
                  <div className="text-[10px] font-bold text-indigo-600/80 uppercase">New Products</div>
                </div>
                <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-center">
                  <div className="text-lg font-black text-indigo-700">{previewData?.variantsToUpdateCount || 0}</div>
                  <div className="text-[10px] font-bold text-indigo-600/80 uppercase">Vars To Update</div>
                </div>
                <div className="p-3 rounded-2xl bg-teal-50/80 border border-teal-100 text-center">
                  <div className="text-lg font-black text-teal-700">{previewData?.variantsToCreateCount || 0}</div>
                  <div className="text-[10px] font-bold text-teal-600/80 uppercase">New Variants</div>
                </div>
              </div>

              {/* Validation Errors List */}
              {previewData?.errors && previewData.errors.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-rose-950">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    Validation & Category Safety Errors ({previewData.errors.length} error{previewData.errors.length > 1 ? 's' : ''})
                  </div>
                  <p className="text-xs text-rose-800">
                    Errors detected. Invalid rows or category mismatch rows will be blocked from updating:
                  </p>
                  <div className="max-h-36 overflow-y-auto rounded-xl bg-white/80 border border-rose-200/60 p-3 text-xs space-y-1.5 font-mono">
                    {previewData.errors.map((err, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-rose-800">
                        <span className="bg-rose-100 text-rose-900 text-[10px] font-bold px-1.5 py-0.5 rounded">Row {err.rowNumber}</span>
                        <span>{err.productTitle ? `[${err.productTitle}] ` : ''}{err.error}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Validation Warnings List */}
              {previewData?.warnings && previewData.warnings.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    Duplicate SKU / MPN Warnings ({previewData.warnings.length})
                  </div>
                  <p className="text-xs text-amber-800">
                    Existing variants matching these SKUs/MPNs will be updated in place without duplicate creation.
                  </p>
                  <div className="max-h-32 overflow-y-auto rounded-xl bg-white/80 border border-amber-200/60 p-3 text-xs space-y-1 font-mono">
                    {previewData.warnings.map((w, idx) => (
                      <div key={idx} className="text-amber-800">
                        • Row {w.rowNumber}: {w.warning}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grouped Products Preview List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Grouped Products Preview ({previewData?.groupedPreview?.length || 0} Products)
                  </h3>
                  <span className="text-[11px] text-zinc-400">Multiple rows grouped under 1 product</span>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {previewData?.groupedPreview?.map((grp, idx) => (
                    <div key={idx} className="border border-zinc-200 rounded-2xl bg-zinc-50/50 overflow-hidden text-xs">
                      {/* Accordion Header */}
                      <div
                        onClick={() => toggleGroup(idx)}
                        className="flex items-center justify-between p-3.5 bg-white hover:bg-zinc-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Package className="w-4 h-4 text-zinc-400 shrink-0" />
                          <span className="font-bold text-zinc-900">{grp.title}</span>
                          <span className="text-zinc-400 text-[11px]">({grp.categoryName})</span>
                          {grp.existsInDb ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              UPDATE Existing Product
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              CREATE New Product
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-zinc-500 text-[11px] font-medium">
                            {grp.totalVariantRows} variant row{grp.totalVariantRows > 1 ? 's' : ''} ({grp.updatedVariantsCount || 0} update, {grp.newVariantsCount || 0} new)
                          </span>
                          {expandedGroup === idx ? (
                            <ChevronUp className="w-4 h-4 text-zinc-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-zinc-400" />
                          )}
                        </div>
                      </div>

                      {/* Accordion Expanded Variants Table */}
                      {expandedGroup === idx && (
                        <div className="p-3 bg-zinc-50 border-t border-zinc-100">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="text-[10px] font-bold text-zinc-400 uppercase border-b border-zinc-200">
                                <th className="pb-1.5 pl-2">Row</th>
                                <th className="pb-1.5">SKU / MPN</th>
                                <th className="pb-1.5">Color</th>
                                <th className="pb-1.5">Storage</th>
                                <th className="pb-1.5">RAM</th>
                                <th className="pb-1.5">MRP</th>
                                <th className="pb-1.5">Disc %</th>
                                <th className="pb-1.5">Final Price</th>
                                <th className="pb-1.5 pr-2">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200/60 text-[11px]">
                              {grp.variants.map((v, vIdx) => (
                                <tr key={vIdx} className="hover:bg-zinc-100/50">
                                  <td className="py-1.5 pl-2 font-mono text-zinc-400">{v.rowNum}</td>
                                  <td className="py-1.5 font-mono font-medium text-zinc-800">{v.sku || v.mpn || '—'}</td>
                                  <td className="py-1.5 text-zinc-700">{v.color || '—'}</td>
                                  <td className="py-1.5 text-zinc-700">{v.storage || '—'}</td>
                                  <td className="py-1.5 text-zinc-700">{v.ram || '—'}</td>
                                  <td className="py-1.5 font-semibold text-zinc-900">₹{Number(v.price).toLocaleString('en-IN')}</td>
                                  <td className="py-1.5 text-emerald-700 font-bold">{v.discountPercent ? `${v.discountPercent}%` : '0%'}</td>
                                  <td className="py-1.5 font-bold text-indigo-700">₹{Number(v.discountPrice || v.price).toLocaleString('en-IN')}</td>
                                  <td className="py-1.5 pr-2">
                                    {v.isUpdate ? (
                                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                                        UPDATE
                                      </span>
                                    ) : (
                                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                                        CREATE
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 border-t border-zinc-100">
          <button
            onClick={onClose}
            disabled={importing}
            className="px-5 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-xs font-bold transition-all cursor-pointer bg-white"
          >
            {importResult ? 'CLOSE' : 'CANCEL'}
          </button>

          {!importResult && (
            <button
              onClick={onConfirmImport}
              disabled={importing || (previewData?.validRows || 0) === 0}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border-0 shadow-sm disabled:opacity-50"
            >
              {importing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  UPDATING PRODUCTS IN MONGODB...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  IMPORT / UPDATE PRODUCTS ({previewData?.validRows || 0} ROWS)
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

