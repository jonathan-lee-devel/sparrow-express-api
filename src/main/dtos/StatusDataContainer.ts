/**
 * DTO used for status data container pattern.
 */
export interface StatusDataContainer<InnerDataType> {
    status: number;
    data: InnerDataType;
}
