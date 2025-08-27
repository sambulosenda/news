/**
 * Workaround for Node.js v24 stream transformation issue
 * This patches the TransformStream to prevent the transformAlgorithm error
 */

if (typeof globalThis !== 'undefined' && !(globalThis as any).TransformStreamPatched) {
  const OriginalTransformStream = (globalThis as any).TransformStream;
  
  if (OriginalTransformStream) {
    (globalThis as any).TransformStream = class PatchedTransformStream extends OriginalTransformStream {
      constructor(transformer?: any, writableStrategy?: any, readableStrategy?: any) {
        // Ensure transformer has required methods
        const patchedTransformer = transformer || {};
        git 
        if (!patchedTransformer.transform) {
          patchedTransformer.transform = (chunk: any, controller: any) => {
            controller.enqueue(chunk);
          };
        }
        
        super(patchedTransformer, writableStrategy, readableStrategy);
      }
    } as any;
    
    // Mark as patched to avoid re-patching
    (globalThis as any).TransformStreamPatched = true;
  }
}

export {};