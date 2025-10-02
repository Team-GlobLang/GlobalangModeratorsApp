export interface ChangeStatusAudio{
      @IsNotEmpty()
  @IsUUID()
  reviewShortId: string;

  @IsNotEmpty()
  @IsUUID()
  reviewedId: string;

  @IsNotEmpty()
  @IsString()
  reviewedBy: string;
  
  @IsOptional()
  @IsString()
  reviewComment?: string;

  @IsNotEmpty()
  @IsBoolean()
  approved: boolean;
}