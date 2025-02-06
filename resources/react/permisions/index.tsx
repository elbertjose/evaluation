import React, { createContext, useContext, useEffect, useState } from 'react';

export interface PermissionAdapter {
    // Método para verificar permisos
    can(action: string, subject: any): boolean;

    // Método para actualizar los permisos basados en el usuario y guardName
    update(currentAuthUser: any, guardName: string): void;
}


const PermissionContext = createContext<{
    adapter: PermissionAdapter | undefined;
} | null>(null);

interface PermissionProviderProps {
    children: React.ReactNode;
    PermissionAdapterClass: new (auth: any, guard?: string) => PermissionAdapter;
    store: any
    guard?: string;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({
                                                                          children,
                                                                          PermissionAdapterClass,
                                                                          store,
                                                                          guard = 'web'
                                                                      }) => {
    const [adapter, setAdapter] = useState<PermissionAdapter | undefined>(undefined);

    useEffect(() => {
        const stateAuth = store.getState().auth;
        if (!stateAuth.currentAuthUser) return; // Asegura que haya un usuario autenticado

        const adapterInstance = new PermissionAdapterClass(stateAuth.currentAuthUser, guard);

        setAdapter(adapterInstance);

        const unsubscribe = store.subscribe(() => {
            const stateAuth = store.getState().auth;
            if (adapterInstance && stateAuth.currentAuthUser) {
                adapterInstance.update(stateAuth.currentAuthUser, guard);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [PermissionAdapterClass, guard, store]);

    return (
        <PermissionContext.Provider value={{ adapter }}>
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermissions = () => {
    const context = useContext(PermissionContext);
    if (!context) {
        throw new Error('usePermissions must be used within a PermissionProvider');
    }

    return context;
};
