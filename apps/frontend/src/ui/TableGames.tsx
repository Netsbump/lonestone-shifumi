import { FINISHED, IN_PROGRESS, NOT_STARTED } from '@/lib/utils/constants';
import type { GameDTO } from '@packages/dtos';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Button, Cell, Column, Row, Table, TableBody, TableHeader } from 'react-aria-components';

const messagesStatus = {
    [IN_PROGRESS]: "En cours",
    [FINISHED]: "Terminée",
    [NOT_STARTED]: "Pas commencé"
}

type TableGamesProps = {
    games: GameDTO[]
}

const PAGE_SIZE = 10;

export const TableGames: React.FC<TableGamesProps> = ({ games }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const paginatedGames = games.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);
    const totalPages = Math.ceil(games.length / PAGE_SIZE);

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className="bg-gray-900 rounded-2xl shadow-md w-full border border-gray-500 px-7 pt-7 pb-9">
            <Table aria-label='Games' selectionMode='single' className="w-full text-left border border-gray-500">
                <TableHeader>
                    <Column isRowHeader className="px-4 py-2 text-light-blue border-b border-gray-700">Game ID</Column>
                    <Column className="px-4 py-2 text-light-blue border-b border-gray-700">Status</Column>
                    <Column className="px-4 py-2 text-light-blue border-b border-gray-700">Nombre de round joués</Column>
                    <Column className="px-4 py-2 text-light-blue border-b border-gray-700">Détail</Column>
                </TableHeader>

                <TableBody>
                    {paginatedGames.map((game) => (
                        <Row key={game.id} className="hover:bg-gray-800 transition-colors">
                            <Cell className="px-4 py-2 text-rose-700 border-b border-gray-500">{game.id}</Cell>
                            <Cell className="px-4 py-2 text-blue-300 border-b border-gray-500">
                                <div className='border border-white rounded-full px-3 py-0 w-fit bg-white text-black'>
                                    {messagesStatus[game.status]}
                                </div>
                            </Cell>
                            <Cell className="px-4 py-2 border-b border-gray-500">{game.roundPlayed}</Cell>
                            <Cell className="px-4 py-2 border-b border-gray-500">
                                <Button className="bg-electric-blue hover:bg-purple-600 text-white px-3 py-1 rounded border-b border-gray-500">
                                    <Link to={`/games/${game.id}`}>{game.status === IN_PROGRESS ? 'Reprendre' : 'Voir'}</Link>
                                </Button>
                            </Cell>
                        </Row>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-end items-center mt-4 gap-7">
               
                <span className="text-gray-400">
                    Page {currentPage + 1} sur {totalPages}
                </span>
                <div className='flex gap-2 mr-1'>
                    <Button
                        onPress={handlePrevPage}
                        isDisabled={currentPage === 0}
                        className="bg-gray-700 text-white px-2 py-2 rounded-full disabled:bg-gray-600"
                    >
                        <ChevronLeftIcon />
                    </Button>
                    <Button
                        onPress={handleNextPage}
                        isDisabled={currentPage === totalPages - 1}
                        className="bg-gray-700 text-white px-2 py-2 rounded-full disabled:bg-gray-600"
                    >
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
};
