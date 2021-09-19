import React from 'react';
import { NoteScreen } from '../page/NoteScreen';
import { Sidebar } from './Sidebar';

export const AppContainer = () => {
    return (
        <div className="app__main-content">
            <Sidebar />
            <main>
                <NoteScreen />
            </main>
        </div>
    )
}
