import React, { useState } from 'react'

import { ScrollView, View } from 'react-native'
import { DataTable } from 'react-native-paper'

import { Food } from '../../services/entities'
import { chunkArray } from '../../utils/chunkArray'
import { StyledCell, StyledHeader } from './FoodTable.styled'

export interface FoodTableProps {
	foods: Food[]
}

export const FoodTable = ({ foods }: FoodTableProps) => {
	const perPage = 5
	const numOfPages = Math.floor(foods.length / 5)
	const [page, setPage] = useState<number>(0)

	const chunkedFoods = chunkArray(foods, perPage)

	return (
		<DataTable>
			<ScrollView horizontal>
				<View>
					<DataTable.Header>
						<StyledHeader>Alimento</StyledHeader>
						<StyledHeader>Validade</StyledHeader>
						<StyledHeader>Quilogramas (kg)</StyledHeader>
						<StyledHeader>Disponibilidade</StyledHeader>
					</DataTable.Header>
					{chunkedFoods[page].map(({ id, name, quantity, isAvailable, validationdate }) => (
						<DataTable.Row key={id}>
							<StyledCell>{name}</StyledCell>
							<StyledCell>
								{new Date(validationdate).toLocaleDateString('pt-BR', {
									month: 'short',
									day: 'numeric'
								})}
							</StyledCell>
							<StyledCell numeric>{quantity}</StyledCell>
							<StyledCell>{isAvailable ? 'Sim' : 'Não'}</StyledCell>
						</DataTable.Row>
					))}
				</View>
			</ScrollView>

			<DataTable.Pagination
				page={page}
				numberOfPages={numOfPages}
				onPageChange={currPage => setPage(currPage)}
				numberOfItemsPerPage={perPage}
				label={`${page + 1} of ${numOfPages > 0 ? numOfPages : 1}`}
				showFastPaginationControls
			/>
		</DataTable>
	)
}

export default FoodTable
